function darkMatterScaling(darkmatter) {
    if (darkmatter.gte("1e8")) return darkmatter.div("1.2")
    return darkmatter
}