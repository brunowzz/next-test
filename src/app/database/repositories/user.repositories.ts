import { type Prisma, PrismaClient } from '@prisma/client'

export class UserRepository {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async create(createDto: Prisma.UserCreateArgs) {
        return this.prisma.user.create(createDto)
    }

    async findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
        return this.prisma.user.findUnique(findUniqueDto)
    }
}
