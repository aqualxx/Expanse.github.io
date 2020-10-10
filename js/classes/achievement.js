class Achievement {
    constructor(index) {
        this.index = index
    }

    parse(txt) {
        return txt
    }

    get reward() {
        return ACH_DATA[this.index].reward !== undefined ? this.parse(ACH_DATA[this.index].reward) : "";
    }

    get title() {
        return ACH_DATA[this.index].title !== undefined ? ACH_DATA[this.index].title : "";
    }

    get desc() {
        return (
            this.title + (
                ACH_DATA[this.index].desc !== undefined ?
                "\n " + this.parse(ACH_DATA[this.index].desc) + "\n" :
                "Not currently implemented."
            ) + (this.reward === "" ? "" : "Reward: " + this.reward)
        );
    }

    give(puttoast = true) {
        if (player.achievements.includes(this.index)) return;
        $("ach" + this.index).classList.add("complete")
        player.achievements.push(this.index)
        if (puttoast) toast.success("Achievement got: " + this.title)
    }
}