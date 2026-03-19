datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client"
  output   = "./generated"
}

model User {
  id    String     @id @default(uuid())
  email String  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt @default(now())
  notes Note[]
}
  


model Note {
  id        String     @id @default(uuid())
  text     String
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt @default(now())
  }




  