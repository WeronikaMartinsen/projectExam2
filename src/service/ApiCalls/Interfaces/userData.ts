interface Avatar {
  url: string;
  alt: string;
}

interface Banner {
  url: string;
  alt: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: Avatar;
  banner?: Banner;
  venueManager: boolean;
}
