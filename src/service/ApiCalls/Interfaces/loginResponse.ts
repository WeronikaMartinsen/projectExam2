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
  name: string;
  email: string;
  bio: string | null;
  avatar: Avatar;
  banner: Banner;
  accessToken: string;
  venueManager: boolean;
}
