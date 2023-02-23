// import & initialize prisma client
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { faker } from '@faker-js/faker';

faker.seed(0)

const total_users = 10
const total_events = 200

async function main() {
  const users = []
  for(let j = 0; j < total_users; j++) {
    users.push({
      email: faker.internet.email()
    })
  }
  await prisma.user.createMany({
    data: users
  })

  for(let i = 0; i < total_events; i++) {
    const user = users[faker.datatype.number(0, total_users - 1)]

    const data = {
      user,
      geoposition: [
        Number(faker.address.latitude()),
        Number(faker.address.longitude())
      ],
      measures: []
    }

    for(let j = 0; j < faker.datatype.number({ min: 3, max: 10 }); j++) {
      data['measures'].push(
        {
          name: faker.science.unit().name,
          value: faker.datatype.number({ min: 0, max: 50, precision: 0.1 })
        }
      )
    }

    await prisma.trackerEvent.create({
      data: {
        ...data,
        user: {
          connect: {
            email: user.email
          }
        }
      }
    })
  }

}
main()
// at the end, disconnect
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})