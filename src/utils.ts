export class UserConstructor {
  id: number;
  username: string;
  address: { street: any; suite: any; city: any };
  name: any;
  email: any;

  constructor(user: UserConstructor) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.username = user.username;
    this.address = {
      street: user.address.street,
      suite: user.address.suite,
      city: user.address.city,
    };
  }
}
