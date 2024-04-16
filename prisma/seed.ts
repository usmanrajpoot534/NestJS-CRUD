// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { email: 'usmanarif534@gmail.com' },
    update: {},
    create: {
      name: 'Usman Arif',
      email: 'usmanarif534@gmail.com',
      age: 25,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alihassan@gmail.com' },
    update: {},
    create: {
      name: 'Ali Hassan',
      email: 'alihassan@gmail.com',
      age: 25,
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
