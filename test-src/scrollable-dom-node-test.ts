import BodyNode from "../src/BodyNode";
import ScrollableDomNode, { ScrollItemDomNode } from "../src/ScrollableDomNode";

type DT = {
    id: string;
    name: string;
};

const dataSet: DT[] = [];
for (let i = 0; i < 100; i += 1) {
    dataSet.push({
        id: `id-${i}`,
        name: `Test ${i}`,
    });
}

class TestItem extends ScrollItemDomNode<DT> {
    public get nodeData() { return this.data; }
    constructor(private data: DT) {
        super(document.createElement("div"));
        this.appendText(data.name);
    }
}

class TestNode extends ScrollableDomNode<DT> {
    constructor() {
        super(
            document.createElement("div"),
            { childTag: "div", baseChildHeight: 24 },
            (data) => new TestItem(data),
        );
        this.style({
            position: "absolute",
            width: "100%",
            height: "100%",
        });
    }
}

const node = new TestNode().appendTo(BodyNode);
node.init(dataSet);
