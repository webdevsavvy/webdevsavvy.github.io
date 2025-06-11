export const pad = (str: string, length: number, align: "left" | "right" = "left", padString: string = ' ') => {
    if (str.length >= length) return str;
    const padding = new Array(length - str.length).join(padString);
    if (align == "left") return str + padding;
    return padding + str;
};
