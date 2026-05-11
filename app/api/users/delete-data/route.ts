import { NextResponse } from 'next/server'
import { UserService } from '@/services/user.service'
import { auth } from "@/auth"

export async function POST() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const result = await UserService.deleteUser(
            session.user.id
        )

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
            )
        }

        return NextResponse.json({
            success: true,
            message: result.message,
        })
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: 'Data deletion failed' },
            { status: 500 }
        )
    }
}