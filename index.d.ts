import { Definitions } from 'bpmn-moddle';

declare class Viewer {
    /**
     * Parse and render a BPMN 2.0 diagram.
     *
     * Once finished the viewer reports back the result to the
     * provided callback function with (err, warnings).
     *
     * ## Life-Cycle Events
     *
     * During import the viewer will fire life-cycle events:
     *
     *   * import.parse.start (about to read model from xml)
     *   * import.parse.complete (model read; may have worked or not)
     *   * import.render.start (graphical import start)
     *   * import.render.complete (graphical import finished)
     *   * import.done (everything done)
     *
     * You can use these events to hook into the life-cycle.
     *
     * @param {string} xml the BPMN 2.0 xml
     * @param {ModdleElement<BPMNDiagram>|string} [bpmnDiagram] BPMN diagram or id of diagram to render (if not provided, the first one will be rendered)
     *
     * Returns {Promise<ImportXMLResult, ImportXMLError>}
     */
    public importXML(xml: string): Promise<ImportXMLError | ImportXMLResult>;

    /**
     * Import parsed definitions and render a BPMN 2.0 diagram.
     *
     * Once finished the viewer reports back the result to the
     * provided callback function with (err, warnings).
     *
     * ## Life-Cycle Events
     *
     * During import the viewer will fire life-cycle events:
     *
     *   * import.render.start (graphical import start)
     *   * import.render.complete (graphical import finished)
     *
     * You can use these events to hook into the life-cycle.
     *
     * @param {ModdleElement<Definitions>} definitions parsed BPMN 2.0 definitions
     * @param {ModdleElement<BPMNDiagram>|string} [bpmnDiagram] BPMN diagram or id of diagram to render (if not provided, the first one will be rendered)
     *
     * Returns {Promise<ImportDefinitionsResult, ImportDefinitionsError>}
     */
    public importDefinitions(definitions: ModdleElement<Definitions>, bpmnDiagram?: ModdleElement<BPMNDiagram | string>): Promise<ImportDefinitionsResult | ImportDefinitionsError>;


    /**
     * Open diagram of previously imported XML.
     *
     * Once finished the viewer reports back the result to the
     * provided callback function with (err, warnings).
     *
     * ## Life-Cycle Events
     *
     * During switch the viewer will fire life-cycle events:
     *
     *   * import.render.start (graphical import start)
     *   * import.render.complete (graphical import finished)
     *
     * You can use these events to hook into the life-cycle.
     *
     * @param {string|ModdleElement<BPMNDiagram>} [bpmnDiagramOrId] id or the diagram to open
     *
     * Returns {Promise<OpenResult, OpenError>}
     */
    public open(bpmnDiagramOrId?: ModdleElement<BPMNDiagram> | string): Promise<OpenResult | OpenError>;

    /**
     * Export the currently displayed BPMN 2.0 diagram as
     * a BPMN 2.0 XML document.
     *
     * ## Life-Cycle Events
     *
     * During XML saving the viewer will fire life-cycle events:
     *
     *   * saveXML.start (before serialization)
     *   * saveXML.serialized (after xml generation)
     *   * saveXML.done (everything done)
     *
     * You can use these events to hook into the life-cycle.
     *
     * @param {Object} [options] export options
     * @param {boolean} [options.format=false] output formatted XML
     * @param {boolean} [options.preamble=true] output preamble
     *
     * Returns {Promise<SaveXMLResult, Error>}
     */
    public saveXML(options?: SaveXMLOptions): Promise<Error | SaveXMLResult>;


    /**
     * Export the currently displayed BPMN 2.0 diagram as
     * an SVG image.
     *
     * ## Life-Cycle Events
     *
     * During SVG saving the viewer will fire life-cycle events:
     *
     *   * saveSVG.start (before serialization)
     *   * saveSVG.done (everything done)
     *
     * You can use these events to hook into the life-cycle.
     *
     * @param {Object} [options]
     *
     * Returns {Promise<SaveSVGResult, Error>}
     */
    public saveSVG(options?: SaveSVGOptions): Promise<SaveSVGResult | Error>;


    /**
     * Get a named diagram service.
     *
     * @example
     *
     * var elementRegistry = viewer.get('elementRegistry');
     * var startEventShape = elementRegistry.get('StartEvent_1');
     *
     * @param {string} name
     *
     * @return {Object} diagram service instance
     *
     * @method BaseViewer#get
     */
    public get(name: 'eventBus' | string): any;

    /**
     * Invoke a function in the context of this viewer.
     *
     * @example
     *
     * viewer.invoke(function(elementRegistry) {
     *   var startEventShape = elementRegistry.get('StartEvent_1');
     * });
     *
     * @param {Function} fn to be invoked
     *
     * @return {Object} the functions return value
     *
     * @method BaseViewer#invoke
     */
    public invoke(fn: (...args: any[]) => void): any;

    public getModules(): any[];

    /**
     * Remove all drawn elements from the viewer.
     *
     * After calling this method the viewer can still
     * be reused for opening another diagram.
     *
     * @method BaseViewer#clear
     */
    public clear(): void;

    /**
     * Destroy the viewer instance and remove all its
     * remainders from the document tree.
     */
    public destroy(): void;

    /**
     *  Register an event listener
     * 
     *  Remove a previously added listener via {@link #off(event, callback)}.
     * @param event 
     * @param callback 
     */
    public on(event: string, callback: (...args: any[]) => void): any;
    /**
     *  Register an event listener
     * 
     *  Remove a previously added listener via {@link #off(event, callback)}.
     * @param event 
     * @param priority 
     * @param callback 
     */
    public on(event: string, priority: number, callback: (...args: any[]) => void): any;
    /**
     *  Register an event listener
     * 
     *  Remove a previously added listener via {@link #off(event, callback)}.
     * @param event 
     * @param priority 
     * @param callback 
     * @param target 
     */
    public on(event: string, priority: number, callback: (...args: any[]) => void, target: any): any;

    /**
     * De-register an event listener
     * 
     * @param event 
     * @param callback 
     */
    public off(event: string, callback: (...args: any[]) => void): void;

    public attachTo(parentNode: HTMLElement): void;

    public getDefinitions(): any;
 
    public detach(): void;
}

declare interface ViewerOptions {
    // the container to render the viewer in, defaults to body.
    container?: HTMLElement;

    // the width of the viewer
    width?: string | number;

    // the height of the viewer
    height?: string | number;

    // extension packages to provide
    moddleExtensions?: object;

    // {Array<didi.Module>}, a list of modules to override the default modules
    modules?: any[];

    //{Array<didi.Module>}, a list of modules to use with the default modules
    additionalModules?: any[];
}

declare interface SaveSVGOptions {}

declare interface SaveSVGResult {
    svg: string;
}

declare interface SaveXMLOptions {
    // output formatted XML
    format?: boolean;

    // output preamble
    preamble?: boolean;
}

declare interface SaveXMLResult {
    xml: string;
}

declare interface OpenResult {
    warnings: string[];
}

declare interface OpenError {
    warnings: string[];
}

declare interface BPMNDiagram { }

declare interface ModdleElement<T> { }

declare interface ImportDefinitionsResult {
    warnings: string[];
}

declare interface ImportDefinitionsError {
    warnings: string[];
}

declare interface ImportXMLResult {
    warnings: string[];
}

declare interface ImportXMLError {
    warnings: string[];
}

export default Viewer;