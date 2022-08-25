import Viewer, {ErrorWarning} from "..";

declare class Modeler extends Viewer {
    public static Viewer: Viewer;

    public createDiagram(): Promise<CreateDiagramResult|CreateDiagramError>;
}

declare interface CreateDiagramResult {
    warnings: Array<string| ErrorWarning>;
}

declare interface CreateDiagramError {
    warnings: Array<string| ErrorWarning>;
}

export default Modeler;