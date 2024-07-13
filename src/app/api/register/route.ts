import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const {fname, username, email, password } = await req.json();

    await connect();

    const userExists = await User.findOne({email});

    if (userExists){
        return new NextResponse("Email is already in use", {status: 400})
    };

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        fname, username,
        email, password: hashPassword
    })

    try{
        await newUser.save();
        return new NextResponse("User is Registered!", { status: 200 })
    } catch (err: any) {
        return new NextResponse(err, {
            status: 500
        });
    }
};