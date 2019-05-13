import { build, fake } from "test-data-bot";

const userBuilder = build("User").fields({
  email: fake(f => `user${f.name.findName()}@test.com`),
  password: fake(f => f.internet.password())
});

export { userBuilder };
