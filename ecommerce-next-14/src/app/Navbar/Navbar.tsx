import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";

// type Props = {};

export default async function Navbar() {
    const cart = await getCart();

    return (
        <div className="bg-base-100">
            <div className="navbar  m-auto max-w-7xl flex-col gap-2 sm:flex-row ">
                <div className="flex-1">
                    <Link href="/" className="btn-ghost btn text-xl normal-case">
                        <Image src={logo} height={40} width={40} alt="Radshodam logo" />
                        RAD-SHOP
                    </Link>
                </div>

                <div className="flex-none gap-2">
                    <form >
                        <div className="form-control">
                            <input
                                name="searchQuery"
                                placeholder="Search"
                                className="input-bordered input w-full min-w-[100px]"
                            />
                        </div>
                    </form>
                    <ShoppingCartButton cart={cart} />
                </div>
            </div>
        </div>
    )


}
