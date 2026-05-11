import { prisma } from "@/lib/prisma";

export class UserService {

    // READ - All
    static async getUsers() {
        try {
            const users = await prisma.user.findMany()

            return {
                success: true, users
            }
        } catch (error: any) {
            return { success: false, error: error.message }
        }
    }

    // READ - by ID
    static async getUserById(userId: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            })

            if (!user) {
                return { success: false, error: 'User not found', code: 404 }
            }

            return { success: true, data: user }
        } catch (error: any) {
            return { success: false, error: error.message }
        }
    }

    // DELETE - Hard (remove from database)
    static async deleteUser(userId: string) {
        try {
            // Delete related data
            await prisma.$transaction([
                prisma.account.deleteMany({ where: { userId } }),
                prisma.session.deleteMany({ where: { userId } }),
                prisma.authenticator.deleteMany({ where: { userId } }),
                prisma.user.delete({ where: { id: userId } }),
            ]);

            return { success: true, message: 'Data deleted successfully' }
        } catch (error: any) {
            if (error.code === 'P2025') {
                return { success: false, error: 'User not found', code: 404 }
            }
            return { success: false, error: error.message }
        }
    }
}