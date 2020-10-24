function spaceScaling(space) {
    let scaledreq = "7.5e7"
    if (space.gte(scaledreq)) return space.minus(scaledreq).div("2").plus(scaledreq);
    return space
}