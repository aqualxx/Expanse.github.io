function showNum(val) {
    val = new Decimal(val);
    if (val.eq(NaN)) return "NaN";
    if (val.gte(1 / 0)) return "Infinity";
    if (val.eq(0)) return "0";
    if (val.sign == -1) return "-" + showNum(val.abs());
    return new Decimal(val).toFixed(3)
}

function formatSize(x) {
    x = new Decimal(x)
    for (i = Object.keys(SIZES).length - 1; i >= 0; i--) {
        let name = Object.keys(SIZES)[i];
        let val = SIZES[name];
        if (x.lt(val) && i > 0) continue;
        return showNum(x.div(val)) + " " + name + "<sup>3</sup>";
    }
}

function pluralize(n) {
    return new Decimal(n).neq("1") ? "s" : ""
}

function formatValue(value, places) {
    value = new Decimal(value);
    return value.gte("1e6") ?
        value.toExponential(places).replace("+", "") :
        value
}