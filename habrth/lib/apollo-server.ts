import { HeaderMap } from "@apollo/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { apolloServer, apolloServerStart } from "@/graphql/server";

const createHeaderMap = (request: NextRequest) => {
  const headers = new HeaderMap();

  request.headers.forEach((value, key) => {
    headers.set(key, value);
  });

  return headers;
};

const createNextHeaders = (headerMap: HeaderMap): Headers => {
  const headers = new Headers();

  headerMap.forEach((value, key) => {
    headers.set(key, value);
  });

  return headers;
};

const readBody = async (request: NextRequest) => {
  if (request.method === "GET") {
    return undefined;
  }

  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return undefined;
  }
};

const handleGraphQLRequest = async (request: NextRequest) => {
  await apolloServerStart;

  const body = await readBody(request);

  const response = await apolloServer.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: request.method,
      headers: createHeaderMap(request),
      search: request.nextUrl.search,
      body,
    },
    context: async () => ({ req: request }),
  });

  const headers = createNextHeaders(response.headers);

  if (response.body.kind !== "complete") {
    return new NextResponse("Incremental delivery is not supported.", {
      status: 500,
      headers,
    });
  }

  return new NextResponse(response.body.string, {
    status: response.status ?? 200,
    headers,
  });
};

export async function GET(request: NextRequest) {
  return handleGraphQLRequest(request);
}

export async function POST(request: NextRequest) {
  return handleGraphQLRequest(request);
}
