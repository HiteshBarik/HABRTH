export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  dob?: string;
};

export type SignupResponse = {
  success?: boolean;
  token?: string;
  user?: {
    _id?: string;
    name?: string;
    email?: string;
    dob?: string;
  };
  message?: string;
  error?: string;
};

export async function signupUser(payload: SignupPayload) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as SignupResponse;

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}
