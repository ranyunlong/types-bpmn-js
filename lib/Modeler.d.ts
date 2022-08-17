import Viewer from "..";

declare class Modeler extends Viewer {
    public static Viewer: Viewer;

    public createDiagram(): Promise<CreateDiagramResult|CreateDiagramError>;
}

declare interface CreateDiagramResult {
    warnings: string[];
}

declare interface CreateDiagramError {
    warnings: string[];
}

export default Modeler;