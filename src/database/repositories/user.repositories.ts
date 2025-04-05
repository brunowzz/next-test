import { db } from '../prisma.service'
import { type Prisma } from '@prisma/client'

export async function createUser(createDto: Prisma.UserCreateArgs) {
    return await db.user.create(createDto)
}

export async function findUniqueUser(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return await db.user.findUnique(findUniqueDto)
}
