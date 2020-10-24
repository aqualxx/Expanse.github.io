function spaceScaling(space) {
    if (space.gte("1e7")) return space.minus("1e7").div("1.2").plus("1e7");
    return space
}