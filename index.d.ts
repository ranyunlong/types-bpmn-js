import { Definitions, BPMNModdle, BaseElement } from 'bpmn-moddle';

declare class Viewer {
    constructor(options: ViewerOptions);
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
    public get(name: 'eventBus'): EventBus;
    public get(name: 'elementRegistry'): ElementRegistry;
    public get(name: string): any;

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

declare namespace didi {
    export interface ContextPadProvider {
        $inject: string[];
    }
    export interface Module {
        contextPadProvider: [string, ContextPadProvider];
    }
}

declare namespace djs {
    export namespace model {
        export interface Base {
            id: string;
            businessObject: object;
            label: object;
            parent: Shape;
            labels: Label;
            outgoing: Connection[];
            incoming: Connection[];
            height: number;
            order: {level?: number}
            type: string;
            x: number;
            y: number;
            di: ModdleElement<any>;
        }

        export interface Shape extends Base {
            children: Base[];
            host: Shape;
            attachers: Shape;
        }

        export interface Root extends Shape {}

        export interface Label extends Shape {
            labelTarget: Base;
        }

        export interface Connection extends Base {
            source: Base;
            target: Base;
        }
    }
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
    modules?: didi.Module[];

    //{Array<didi.Module>}, a list of modules to use with the default modules
    additionalModules?: didi.Module[];

    keyboard?: {
        bindTo?: Window | Document | HTMLElement;
    }
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

declare interface ModdleElement<T> extends BaseElement {}

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

declare interface InternalEventImpl {
    type: string;
}

declare interface InternalEvent extends InternalEventImpl {
    stopPropagation(): void;
    preventDefault(): void;
    init(data: InternalEventImpl): void;
}

declare type EvtName = "diagram.destroy" | "render.shape" | "render.connection" | "render.getShapePath" | "render.getConnectionPath" | "diagram.init" | "shape.added" | "connection.added" | "shape.removed" | "connection.removed" | "elements.changed" | "root.set" | "diagram.clear" | "canvas.destroy" | "canvas.init" | "shape.changed" | "connection.changed" | "interactionEvents.createHit" | "interactionEvents.updateHit" | "shape.remove" | "connection.remove" | "element.hover" | "element.out" | "selection.changed" | "element.changed" | "create.end" | "connect.end" | "shape.move.end" | "element.click" | "canvas.viewbox.changing" | "canvas.viewbox.changed" | "element.marker.update" | "commandStack.executed" | "commandStack.revert" | "commandStack.shape.toggleCollapse.executed" | "commandStack.shape.toggleCollapse.reverted" | "commandStack.shape.create.executed" | "commandStack.shape.move.executed" | "commandStack.shape.delete.executed" | "commandStack.shape.create.reverted" | "commandStack.shape.move.reverted" | "commandStack.shape.delete.reverted" | "import.render.complete" | "import.render.start" | "attach" | "detach" | "editorActions.init" | "keyboard.keydown" | "element.mousedown" | "commandStack.connection.start.canExecute" | "commandStack.connection.create.canExecute" | "commandStack.connection.reconnect.canExecute" | "commandStack.connection.updateWaypoints.canExecute" | "commandStack.shape.resize.canExecute" | "commandStack.elements.create.canExecute" | "commandStack.elements.move.canExecute" | "commandStack.shape.create.canExecute" | "commandStack.shape.attach.canExecute" | "commandStack.element.copy.canExecute" | "shape.move.start" | "shape.move.move" | "tool-manager.update" | "i18n.changed" | "drag.move" | "contextPad.create" | "palette.create" | "contextPad.getProviders" | "popupMenu.getProviders.align-elements" | "commandStack.elements.align.canExecute" | "autoPlace.end" | "autoPlace" | "drag.start" | "drag.cleanup" | "commandStack.shape.create.postExecuted" | "commandStack.elements.move.postExecuted" | "commandStack.shape.toggleCollapse.postExecuted" | "commandStack.shape.resize.postExecuted" | "commandStack.element.autoResize.canExecute" | "bendpoint.move.hover" | "bendpoint.move.out" | "bendpoint.move.cleanup" | "bendpoint.move.end" | "connectionSegment.move.start" | "connectionSegment.move.move" | "connectionSegment.move.hover" | "connectionSegment.move.out" | "connectionSegment.move.cleanup" | "connectionSegment.move.cancel" | "connectionSegment.move.end" | "element.mousemove" | "element.updateId" | "connect.hover" | "connect.move" | "bendpoint.move.move" | "bendpoint.move.start" | "bendpoint.move.cancel" | "connect.out" | "connect.cleanup" | "create.move" | "create.hover" | "create.out" | "create.cleanup" | "create.init" | "copyPaste.copyElement" | "copyPaste.pasteElements" | "moddleCopy.canCopyProperties" | "moddleCopy.canCopyProperty" | "moddleCopy.canSetCopiedProperty" | "copyPaste.pasteElement" | "popupMenu.getProviders.bpmn-replace" | "commandStack.elements.distribute.canExecute" | "resize.move" | "resize.end" | "commandStack.shape.resize.preExecute" | "spaceTool.move" | "spaceTool.end" | "create.start" | "commandStack.connection.create.postExecuted" | "commandStack.connection.layout.postExecuted" | "shape.move.init" | "resize.start" | "resize.cleanup" | "element.dblclick" | "autoPlace.start" | "drag.init" | "popupMenu.open" | "commandStack.changed" | "directEditing.activate" | "directEditing.resize" | "directEditing.complete" | "directEditing.cancel" | "commandStack.connection.updateWaypoints.postExecuted" | "commandStack.label.create.postExecuted" | "commandStack.elements.create.postExecuted" | "commandStack.shape.append.preExecute" | "commandStack.shape.move.postExecute" | "commandStack.elements.move.preExecute" | "commandStack.connection.create.postExecute" | "commandStack.connection.reconnect.postExecute" | "commandStack.shape.create.preExecute" | "commandStack.elements.create.preExecute" | "commandStack.shape.create.execute" | "commandStack.shape.create.revert" | "commandStack.shape.create.postExecute" | "commandStack.connection.create.executed" | "commandStack.connection.delete.executed" | "commandStack.connection.move.executed" | "commandStack.connection.reconnect.executed" | "commandStack.connection.create.reverted" | "commandStack.connection.delete.reverted" | "commandStack.connection.move.reverted" | "commandStack.connection.reconnect.reverted" | "commandStack.connection.layout.executed" | "commandStack.connection.layout.reverted" | "commandStack.canvas.updateRoot.executed" | "commandStack.canvas.updateRoot.reverted" | "commandStack.shape.resize.executed" | "commandStack.shape.resize.reverted" | "commandStack.connection.updateWaypoints.executed" | "commandStack.connection.updateWaypoints.reverted" | "commandStack.element.updateAttachment.executed" | "commandStack.element.updateAttachment.reverted" | "commandStack.shape.delete.postExecute" | "commandStack.canvas.updateRoot.postExecute" | "spaceTool.selection.init" | "spaceTool.selection.ended" | "spaceTool.selection.canceled" | "spaceTool.ended" | "spaceTool.canceled" | "spaceTool.selection.end" | "commandStack.shape.delete.postExecuted" | "commandStack.connection.create.preExecuted" | "commandStack.shape.replace.preExecuted" | "shape.move.hover" | "shape.move.out" | "global-connect.hover" | "global-connect.out" | "global-connect.end" | "global-connect.cleanup" | "connect.start" | "bpmnElement.added" | "commandStack.element.updateProperties.postExecute" | "commandStack.label.create.postExecute" | "commandStack.connection.layout.postExecute" | "commandStack.connection.updateWaypoints.postExecute" | "commandStack.shape.replace.postExecute" | "commandStack.shape.resize.postExecute" | "commandStack.connection.move.postExecute" | "shape.move.rejected" | "create.rejected" | "commandStack.shape.delete.preExecute" | "commandStack.connection.reconnect.preExecute" | "commandStack.element.updateProperties.postExecuted" | "commandStack.shape.replace.postExecuted" | "spaceTool.getMinDimensions" | "commandStack.shape.delete.preExecuted" | "commandStack.element.updateProperties.executed" | "commandStack.element.updateProperties.reverted" | "copyPaste.createTree" | "commandStack.connection.delete.preExecute" | "commandStack.canvas.updateRoot.preExecute" | "commandStack.spaceTool.preExecute" | "commandStack.lane.add.preExecute" | "commandStack.lane.resize.preExecute" | "commandStack.lane.split.preExecute" | "commandStack.elements.delete.preExecute" | "commandStack.shape.move.preExecute" | "commandStack.spaceTool.postExecuted" | "commandStack.lane.add.postExecuted" | "commandStack.lane.resize.postExecuted" | "commandStack.lane.split.postExecuted" | "commandStack.elements.delete.postExecuted" | "commandStack.shape.move.postExecuted" | "saveXML.start" | "commandStack.connection.create.preExecute" | "commandStack.connection.move.preExecute" | "shape.move.cleanup" | "commandStack.elements.move.preExecuted" | "commandStack.shape.delete.execute" | "commandStack.shape.delete.revert" | "spaceTool.selection.start" | "spaceTool.selection.move" | "spaceTool.selection.cleanup" | "spaceTool.cleanup" | "lasso.selection.init" | "lasso.selection.ended" | "lasso.selection.canceled" | "lasso.ended" | "lasso.canceled" | "lasso.selection.end" | "lasso.end" | "lasso.start" | "lasso.move" | "lasso.cleanup" | "hand.init" | "hand.ended" | "hand.canceled" | "hand.move.ended" | "hand.move.canceled" | "keyboard.keyup" | "hand.end" | "hand.move.move" | "hand.move.end" | "global-connect.init" | "global-connect.ended" | "global-connect.canceled" | "global-connect.drag.ended" | "global-connect.drag.canceled" | "palette.getProviders" | "canvas.resized" | "import.parse.complete"

declare type EventCallback = (event: InternalEvent) => void;

declare interface EventBus {
    createEvent(data: InternalEventImpl): InternalEvent;
    fire(type: InternalEventImpl | string, data: InternalEventImpl | InternalEvent): boolean;

    on(events: EvtName | EvtName[] | string | string[], callback: EventCallback): void;
    on(events: EvtName | EvtName[] | string | string[], priority: number, callback: EventCallback): void;
    on(events: EvtName | EvtName[] | string | string[], priority: number, callback: EventCallback, that: any): void;

    off(events: EvtName | EvtName[] | string | string[], callback: EventCallback): void;

    once(event: EvtName | string, callback: EventCallback): void;
    once(event: EvtName | string, callback: EventCallback, that: any): void;
    once(event: EvtName | string, priority: number, callback: EventCallback, that: any): void;

    handleError(error: Error): void;
}

declare interface ElementRegistry {
    new (eventBus: EventBus): ElementRegistry;
    add(element: djs.model.Base, gfx: SVGElement, secondaryGfx?: SVGElement): void;
    filter(fn: (element: djs.model.Base, gfx: SVGElement) => void): djs.model.Base[];
    find(fn: (element: djs.model.Base, gfx: SVGElement) => void): djs.model.Base;
    forEach(fn: (element: djs.model.Base, gfx: SVGElement) => void): void;
    get(filter: string | SVGElement): djs.model.Base;
    getAll(): djs.model.Base[];
    getGraphics(filter: string | djs.model.Base, secondary?: boolean): SVGElement;
    remove(element: djs.model.Base): void;
    updateGraphics(filter: djs.model.Base, gfx: SVGElement, secondary?: boolean): void;
    updateId(element: djs.model.Base, newId: string): void;
}

export default Viewer;