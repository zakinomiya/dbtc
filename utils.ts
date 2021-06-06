
export const ntob = (n: number | bigint) => typeof n == "bigint" ? n : BigInt(n)
