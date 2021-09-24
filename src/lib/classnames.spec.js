import { classNames } from "./classnames";

test("classnames combine multiple classnames into one", () => {
    const result = classNames("text-lg", "bg-black font-bold");

    expect(result).toBe("text-lg bg-black font-bold")
});