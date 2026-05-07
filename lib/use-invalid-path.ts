"use client";

import { usePathname } from "next/navigation";

export default function UseInvalidPaths() {
	const pathName = usePathname();

	const invalidPath = ["studio"];

	const isInvalid = invalidPath.some((path) => pathName.includes(path));

	return isInvalid;
}
