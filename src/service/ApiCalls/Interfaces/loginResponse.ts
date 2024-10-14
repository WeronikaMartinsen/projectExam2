interface Avatar {
  url: string;
  alt: string;
}

interface Banner {
  url: string;
  alt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    name: string;
    email: string;
    avatar?: Avatar;
    banner?: Banner;
    accessToken: string;
    venueManager?: boolean;
  };
  meta: object;
}
