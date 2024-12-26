import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {

    try {
        const res=NextResponse.json({message:"Logout successfully",success:true},{status:200})
        res.cookies.set("token","",{httpOnly:true,expires:new Date(0)})
        return res;

    } catch (error) {

        return NextResponse.json(
            { message: "An error occurred while processing your request." },
            { status: 500 }
          );
    }
}
