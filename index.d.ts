import {BaseElement, Definitions, Point} from 'bpmn-moddle';

export declare class Viewer {
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
  public importXML(xml: string, bpmnDiagram?: string | ModdleElement<BPMNDiagram>): Promise<ImportXMLError | ImportXMLResult>;

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
  public get(name: 'canvas'): Canvas;
  public get(name: 'commandStack'): CommandStack;
  public get(name: 'contextPad'): ContextPad;
  public get(name: 'copyPaste'): CopyPaste;
  public get(name: 'modeling'): any;
  public get(name: 'palette'): any;
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

export declare namespace didi {
  export interface ContextPadProvider {
    $inject: string[];
  }

  export interface Module {
    contextPadProvider: [string, ContextPadProvider];
  }
}

export declare namespace djs {
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
      order: { level?: number }
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

    export interface Root extends Shape {
    }

    export interface Label extends Shape {
      labelTarget: Base;
    }

    export interface Connection extends Base {
      source: Base;
      target: Base;
    }
  }
}

export declare interface ViewerOptions {
  // the container to render the viewer in, defaults to body.
  container?: HTMLElement;

  // the width of the viewer
  width?: string | number;

  // the height of the viewer
  height?: string | number;

  // extension packages to provide
  moddleExtensions?: object;

  // {Array<didi.Module>}, a list of modules to override the default modules
  modules?: didi.Module[] | any[];

  //{Array<didi.Module>}, a list of modules to use with the default modules
  additionalModules?: didi.Module[] | any;

  textRenderer?: {
    defaultStyle: {
      fontFamily: string;
      [key: string]: any;
    };
  };


  bpmnRenderer?: {
    defaultFillColor: string;
    defaultStrokeColor: string;
    [key: string]: any;
  };

  keyboard?: {
    bindTo?: Window | Document | HTMLElement;
  }
}

export declare interface SaveSVGOptions {
}

export declare interface SaveSVGResult {
  svg: string;
}

export declare interface SaveXMLOptions {
  // output formatted XML
  format?: boolean;

  // output preamble
  preamble?: boolean;
}

export declare interface SaveXMLResult {
  xml: string;
}

export declare interface OpenResult {
  warnings: string[];
}

export declare interface OpenError {
  warnings: string[];
}

export declare interface BPMNDiagram {
}

export declare interface ModdleElement<T> extends BaseElement {
}

export declare interface ImportDefinitionsResult {
  warnings: string[];
}

export declare interface ImportDefinitionsError {
  warnings: string[];
}

export declare interface ImportXMLResult {
  warnings: string[];
}

export declare interface ImportXMLError {
  warnings: string[];
}

export declare interface InternalEventImpl {
  type: string;
}

export declare interface InternalEvent extends InternalEventImpl {
  stopPropagation(): void;

  preventDefault(): void;

  init(data: InternalEventImpl): void;
}

declare type EvtName =
  "diagram.destroy"
  | "render.shape"
  | "render.connection"
  | "render.getShapePath"
  | "render.getConnectionPath"
  | "diagram.init"
  | "shape.added"
  | "connection.added"
  | "shape.removed"
  | "connection.removed"
  | "elements.changed"
  | "root.set"
  | "diagram.clear"
  | "canvas.destroy"
  | "canvas.init"
  | "shape.changed"
  | "connection.changed"
  | "interactionEvents.createHit"
  | "interactionEvents.updateHit"
  | "shape.remove"
  | "connection.remove"
  | "element.hover"
  | "element.out"
  | "selection.changed"
  | "element.changed"
  | "create.end"
  | "connect.end"
  | "shape.move.end"
  | "element.click"
  | "canvas.viewbox.changing"
  | "canvas.viewbox.changed"
  | "element.marker.update"
  | "commandStack.executed"
  | "commandStack.revert"
  | "commandStack.shape.toggleCollapse.executed"
  | "commandStack.shape.toggleCollapse.reverted"
  | "commandStack.shape.create.executed"
  | "commandStack.shape.move.executed"
  | "commandStack.shape.delete.executed"
  | "commandStack.shape.create.reverted"
  | "commandStack.shape.move.reverted"
  | "commandStack.shape.delete.reverted"
  | "import.render.complete"
  | "import.render.start"
  | "attach"
  | "detach"
  | "editorActions.init"
  | "keyboard.keydown"
  | "element.mousedown"
  | "commandStack.connection.start.canExecute"
  | "commandStack.connection.create.canExecute"
  | "commandStack.connection.reconnect.canExecute"
  | "commandStack.connection.updateWaypoints.canExecute"
  | "commandStack.shape.resize.canExecute"
  | "commandStack.elements.create.canExecute"
  | "commandStack.elements.move.canExecute"
  | "commandStack.shape.create.canExecute"
  | "commandStack.shape.attach.canExecute"
  | "commandStack.element.copy.canExecute"
  | "shape.move.start"
  | "shape.move.move"
  | "tool-manager.update"
  | "i18n.changed"
  | "drag.move"
  | "contextPad.create"
  | "palette.create"
  | "contextPad.getProviders"
  | "popupMenu.getProviders.align-elements"
  | "commandStack.elements.align.canExecute"
  | "autoPlace.end"
  | "autoPlace"
  | "drag.start"
  | "drag.cleanup"
  | "commandStack.shape.create.postExecuted"
  | "commandStack.elements.move.postExecuted"
  | "commandStack.shape.toggleCollapse.postExecuted"
  | "commandStack.shape.resize.postExecuted"
  | "commandStack.element.autoResize.canExecute"
  | "bendpoint.move.hover"
  | "bendpoint.move.out"
  | "bendpoint.move.cleanup"
  | "bendpoint.move.end"
  | "connectionSegment.move.start"
  | "connectionSegment.move.move"
  | "connectionSegment.move.hover"
  | "connectionSegment.move.out"
  | "connectionSegment.move.cleanup"
  | "connectionSegment.move.cancel"
  | "connectionSegment.move.end"
  | "element.mousemove"
  | "element.updateId"
  | "connect.hover"
  | "connect.move"
  | "bendpoint.move.move"
  | "bendpoint.move.start"
  | "bendpoint.move.cancel"
  | "connect.out"
  | "connect.cleanup"
  | "create.move"
  | "create.hover"
  | "create.out"
  | "create.cleanup"
  | "create.init"
  | "copyPaste.copyElement"
  | "copyPaste.pasteElements"
  | "moddleCopy.canCopyProperties"
  | "moddleCopy.canCopyProperty"
  | "moddleCopy.canSetCopiedProperty"
  | "copyPaste.pasteElement"
  | "popupMenu.getProviders.bpmn-replace"
  | "commandStack.elements.distribute.canExecute"
  | "resize.move"
  | "resize.end"
  | "commandStack.shape.resize.preExecute"
  | "spaceTool.move"
  | "spaceTool.end"
  | "create.start"
  | "commandStack.connection.create.postExecuted"
  | "commandStack.connection.layout.postExecuted"
  | "shape.move.init"
  | "resize.start"
  | "resize.cleanup"
  | "element.dblclick"
  | "autoPlace.start"
  | "drag.init"
  | "popupMenu.open"
  | "commandStack.changed"
  | "directEditing.activate"
  | "directEditing.resize"
  | "directEditing.complete"
  | "directEditing.cancel"
  | "commandStack.connection.updateWaypoints.postExecuted"
  | "commandStack.label.create.postExecuted"
  | "commandStack.elements.create.postExecuted"
  | "commandStack.shape.append.preExecute"
  | "commandStack.shape.move.postExecute"
  | "commandStack.elements.move.preExecute"
  | "commandStack.connection.create.postExecute"
  | "commandStack.connection.reconnect.postExecute"
  | "commandStack.shape.create.preExecute"
  | "commandStack.elements.create.preExecute"
  | "commandStack.shape.create.execute"
  | "commandStack.shape.create.revert"
  | "commandStack.shape.create.postExecute"
  | "commandStack.connection.create.executed"
  | "commandStack.connection.delete.executed"
  | "commandStack.connection.move.executed"
  | "commandStack.connection.reconnect.executed"
  | "commandStack.connection.create.reverted"
  | "commandStack.connection.delete.reverted"
  | "commandStack.connection.move.reverted"
  | "commandStack.connection.reconnect.reverted"
  | "commandStack.connection.layout.executed"
  | "commandStack.connection.layout.reverted"
  | "commandStack.canvas.updateRoot.executed"
  | "commandStack.canvas.updateRoot.reverted"
  | "commandStack.shape.resize.executed"
  | "commandStack.shape.resize.reverted"
  | "commandStack.connection.updateWaypoints.executed"
  | "commandStack.connection.updateWaypoints.reverted"
  | "commandStack.element.updateAttachment.executed"
  | "commandStack.element.updateAttachment.reverted"
  | "commandStack.shape.delete.postExecute"
  | "commandStack.canvas.updateRoot.postExecute"
  | "spaceTool.selection.init"
  | "spaceTool.selection.ended"
  | "spaceTool.selection.canceled"
  | "spaceTool.ended"
  | "spaceTool.canceled"
  | "spaceTool.selection.end"
  | "commandStack.shape.delete.postExecuted"
  | "commandStack.connection.create.preExecuted"
  | "commandStack.shape.replace.preExecuted"
  | "shape.move.hover"
  | "shape.move.out"
  | "global-connect.hover"
  | "global-connect.out"
  | "global-connect.end"
  | "global-connect.cleanup"
  | "connect.start"
  | "bpmnElement.added"
  | "commandStack.element.updateProperties.postExecute"
  | "commandStack.label.create.postExecute"
  | "commandStack.connection.layout.postExecute"
  | "commandStack.connection.updateWaypoints.postExecute"
  | "commandStack.shape.replace.postExecute"
  | "commandStack.shape.resize.postExecute"
  | "commandStack.connection.move.postExecute"
  | "shape.move.rejected"
  | "create.rejected"
  | "commandStack.shape.delete.preExecute"
  | "commandStack.connection.reconnect.preExecute"
  | "commandStack.element.updateProperties.postExecuted"
  | "commandStack.shape.replace.postExecuted"
  | "spaceTool.getMinDimensions"
  | "commandStack.shape.delete.preExecuted"
  | "commandStack.element.updateProperties.executed"
  | "commandStack.element.updateProperties.reverted"
  | "copyPaste.createTree"
  | "commandStack.connection.delete.preExecute"
  | "commandStack.canvas.updateRoot.preExecute"
  | "commandStack.spaceTool.preExecute"
  | "commandStack.lane.add.preExecute"
  | "commandStack.lane.resize.preExecute"
  | "commandStack.lane.split.preExecute"
  | "commandStack.elements.delete.preExecute"
  | "commandStack.shape.move.preExecute"
  | "commandStack.spaceTool.postExecuted"
  | "commandStack.lane.add.postExecuted"
  | "commandStack.lane.resize.postExecuted"
  | "commandStack.lane.split.postExecuted"
  | "commandStack.elements.delete.postExecuted"
  | "commandStack.shape.move.postExecuted"
  | "saveXML.start"
  | "commandStack.connection.create.preExecute"
  | "commandStack.connection.move.preExecute"
  | "shape.move.cleanup"
  | "commandStack.elements.move.preExecuted"
  | "commandStack.shape.delete.execute"
  | "commandStack.shape.delete.revert"
  | "spaceTool.selection.start"
  | "spaceTool.selection.move"
  | "spaceTool.selection.cleanup"
  | "spaceTool.cleanup"
  | "lasso.selection.init"
  | "lasso.selection.ended"
  | "lasso.selection.canceled"
  | "lasso.ended"
  | "lasso.canceled"
  | "lasso.selection.end"
  | "lasso.end"
  | "lasso.start"
  | "lasso.move"
  | "lasso.cleanup"
  | "hand.init"
  | "hand.ended"
  | "hand.canceled"
  | "hand.move.ended"
  | "hand.move.canceled"
  | "keyboard.keyup"
  | "hand.end"
  | "hand.move.move"
  | "hand.move.end"
  | "global-connect.init"
  | "global-connect.ended"
  | "global-connect.canceled"
  | "global-connect.drag.ended"
  | "global-connect.drag.canceled"
  | "palette.getProviders"
  | "canvas.resized"
  | "import.parse.complete"

export declare type EventCallback = (event: InternalEvent) => void;

export declare interface EventBus {
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

export declare interface ElementRegistry {
  new(eventBus: EventBus): ElementRegistry;

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

export declare class Canvas {
  /**
   * Returns the default layer on which
   * all elements are drawn.
   *
   * @returns {SVGElement}
   */
  public getDefaultLayer(): SVGAElement;

  /**
   * Returns a layer that is used to draw elements
   * or annotations on it.
   *
   * Non-existing layers retrieved through this method
   * will be created. During creation, the optional index
   * may be used to create layers below or above existing layers.
   * A layer with a certain index is always created above all
   * existing layers with the same index.
   *
   * @param {string} name
   * @param {number} index
   *
   * @returns {SVGElement}
   */
  public getLayer(name: string, index: number): SVGAElement;

  /**
   * Shows a given layer.
   *
   * @param {String} layer
   * @returns {SVGElement}
   */
  public showLayer(layer: string): SVGAElement;


  /**
   * Shows a given layer.
   *
   * @param {String} layer
   * @returns {SVGElement}
   */
  public hideLayer(layer: string): SVGAElement;

  /**
   * Returns the currently active layer. Can be null.
   *
   * @returns {SVGElement|null}
   */
  public getActiveLayer(): SVGAElement | null;

  /**
   * Returns the plane which contains the given element.
   *
   * @param {string|djs.model.Base} element
   *
   * @return {djs.model.Base} root for element
   */
  public findRoot(element: djs.model.Base | string): djs.model.Base;

  /**
   * Return a list of all root elements on the diagram.
   *
   * @return {djs.model.Root[]}
   */
  public getRootElements(): djs.model.Root[];

  /**
   * Returns the html element that encloses the
   * drawing canvas.
   *
   * @return {DOMNode}
   */
  public getContainer(): DOMNode;

  /**
   * Adds a marker to an element (basically a css class).
   *
   * Fires the element.marker.update event, making it possible to
   * integrate extension into the marker life-cycle, too.
   *
   * @example
   * canvas.addMarker('foo', 'some-marker');
   *
   * var fooGfx = canvas.getGraphics('foo');
   *
   * fooGfx; // <g class="... some-marker"> ... </g>
   *
   * @param {string|djs.model.Base} element
   * @param {string} marker
   */
  public addMarker(element: string | djs.model.Base, marker: string): void;

  /**
   * Remove a marker from an element.
   *
   * Fires the element.marker.update event, making it possible to
   * integrate extension into the marker life-cycle, too.
   *
   * @param  {string|djs.model.Base} element
   * @param  {string} marker
   */
  public removeMarker(element: string | djs.model.Base, marker: string): void;


  /**
   * Check the existence of a marker on element.
   *
   * @param  {string|djs.model.Base} element
   * @param  {string} marker
   */
  public hasMarker(element: string | djs.model.Base, marker: string): void;

  /**
   * Toggles a marker on an element.
   *
   * Fires the element.marker.update event, making it possible to
   * integrate extension into the marker life-cycle, too.
   *
   * @param  {string|djs.model.Base} element
   * @param  {string} marker
   */
  public toggleMarker(element: string | djs.model.Base, marker: string): void;

  /**
   * Returns the current root element.
   *
   * Supports two different modes for handling root elements:
   *
   * 1. if no root element has been added before, an implicit root will be added
   * and returned. This is used in applications that don't require explicit
   * root elements.
   *
   * 2. when root elements have been added before calling `getRootElement`,
   * root elements can be null. This is used for applications that want to manage
   * root elements themselves.
   *
   * @returns {Object|djs.model.Root|null} rootElement.
   */
  public getRootElement(): djs.model.Root | null | object;

  /**
   * Adds a given root element and returns it.
   *
   * @param {Object|djs.model.Root} rootElement
   *
   * @return {Object|djs.model.Root} rootElement
   */
  public addRootElement<T extends object | djs.model.Root>(rootElement: T): T;

  /**
   * Removes a given rootElement and returns it.
   *
   * @param {djs.model.Root|String} rootElement
   *
   * @return {Object|djs.model.Root} rootElement
   */
  public removeRootElement<T extends object | djs.model.Root>(rootElement: T): T;

  /**
   * Sets a given element as the new root element for the canvas
   * and returns the new root element.
   *
   * @param {Object|djs.model.Root} rootElement
   *
   * @return {Object|djs.model.Root} new root element
   */
  public setRootElement<T extends object | djs.model.Root>(rootElement: T): T;

  /**
   * Adds a shape to the canvas
   *
   * @param {Object|djs.model.Shape} shape to add to the diagram
   * @param {djs.model.Base} [parent]
   * @param {number} [parentIndex]
   *
   * @return {djs.model.Shape} the added shape
   */
  public addShape(shape: object | djs.model.Shape, parent?: djs.model.Base, parentIndex?: number): djs.model.Shape;

  /**
   * Removes a shape from the canvas
   *
   * @param {string|djs.model.Shape} shape or shape id to be removed
   *
   * @return {djs.model.Shape} the removed shape
   */
  public removeShape(shape: object | djs.model.Shape): djs.model.Shape;

  /**
   * Removes a connection from the canvas
   *
   * @param {string|djs.model.Connection} connection or connection id to be removed
   *
   * @return {djs.model.Connection} the removed connection
   */
  public removeConnection(connection: djs.model.Connection | string): djs.model.Connection;

  /**
   * Return the graphical object underlaying a certain diagram element
   *
   * @param {string|djs.model.Base} element descriptor of the element
   * @param {boolean} [secondary=false] whether to return the secondary connected element
   *
   * @return {SVGElement}
   */
  public getGraphics(element: string | djs.model.Base, secondary?: boolean): SVGAElement;

  /**
   * Gets or sets the view box of the canvas, i.e. the
   * area that is currently displayed.
   *
   * The getter may return a cached viewbox (if it is currently
   * changing). To force a recomputation, pass `false` as the first argument.
   *
   * @example
   *
   * canvas.viewbox({ x: 100, y: 100, width: 500, height: 500 })
   *
   * // sets the visible area of the diagram to (100|100) -> (600|100)
   * // and and scales it according to the diagram width
   *
   * var viewbox = canvas.viewbox(); // pass `false` to force recomputing the box.
   *
   * console.log(viewbox);
   * // {
   * //   inner: Dimensions,
   * //   outer: Dimensions,
   * //   scale,
   * //   x, y,
   * //   width, height
   * // }
   *
   * // if the current diagram is zoomed and scrolled, you may reset it to the
   * // default zoom via this method, too:
   *
   * var zoomedAndScrolledViewbox = canvas.viewbox();
   *
   * canvas.viewbox({
   *   x: 0,
   *   y: 0,
   *   width: zoomedAndScrolledViewbox.outer.width,
   *   height: zoomedAndScrolledViewbox.outer.height
   * });
   *
   * @param  {Object} [box] the new view box to set
   * @param  {number} box.x the top left X coordinate of the canvas visible in view box
   * @param  {number} box.y the top left Y coordinate of the canvas visible in view box
   * @param  {number} box.width the visible width
   * @param  {number} box.height
   *
   * @return {Object} the current view box
   */
  public viewbox(box: CanvasViewBoxOps): object;

  /**
   * Gets or sets the scroll of the canvas.
   *
   * @param {Object} [delta] the new scroll to apply.
   *
   * @param {number} [delta.dx]
   * @param {number} [delta.dy]
   */
  public scroll(delta?: CanvasScrollDelta): void;

  /**
   * Scrolls the viewbox to contain the given element.
   * Optionally specify a padding to be applied to the edges.
   *
   * @param {Object|String} [element] the element to scroll to.
   * @param {Object|Number} [padding=100] the padding to be applied. Can also specify top, bottom, left and right.
   *
   */
  public scrollToElement(element?: object | string, padding?: object | number): void;

  /**
   * Gets or sets the current zoom of the canvas, optionally zooming
   * to the specified position.
   *
   * The getter may return a cached zoom level. Call it with `false` as
   * the first argument to force recomputation of the current level.
   *
   * @param {string|number} [newScale] the new zoom level, either a number, i.e. 0.9,
   *                                   or `fit-viewport` to adjust the size to fit the current viewport
   * @param {string|Point} [center] the reference point { x: .., y: ..} to zoom to, 'auto' to zoom into mid or null
   *
   * @return {number} the current scale
   */
  public zoom(newScale?: number | 'fit-viewport' | string, center?: string | CanvasZoomPoint): number;

  /**
   * Returns the size of the canvas
   *
   * @return {Dimensions}
   */
  public getSize(): Dimensions;

  /**
   * Return the absolute bounding box for the given element
   *
   * The absolute bounding box may be used to display overlays in the
   * callers (browser) coordinate system rather than the zoomed in/out
   * canvas coordinates.
   *
   * @param  {ElementDescriptor} element
   * @return {Bounds} the absolute bounding box
   */
  public getAbsoluteBBox(element: ElementDescriptor): Bounds;

  /**
   * Fires an event in order other modules can react to the
   * canvas resizing
   */
  public resized(): void;
}

declare type DOMNode = any;

export declare interface CanvasViewBoxOps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export declare interface CanvasScrollDelta {
  dx?: number;
  dy?: number;
}

export declare interface CanvasZoomPoint {
  x: number;
  y: number;
}

export declare interface Dimensions {
  width: number;
  height: number;
}

export declare interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export declare type ElementDescriptor = any;

export declare class CommandStack {
  public static $inject: ['eventBus', 'injector'];

  /**
   * Execute a command
   *
   * @param {string} command the command to execute
   * @param {Object} context the environment to execute the command in
   */
  public execute(command: string, context: object): void;

  /**
   * Ask whether a given command can be executed.
   *
   * Implementors may hook into the mechanism on two ways:
   *
   *   * in event listeners:
   *
   *     Users may prevent the execution via an event listener.
   *     It must prevent the default action for `commandStack.(<command>.)canExecute` events.
   *
   *   * in command handlers:
   *
   *     If the method {@link CommandHandler#canExecute} is implemented in a handler
   *     it will be called to figure out whether the execution is allowed.
   *
   * @param  {string} command the command to execute
   * @param  {Object} context the environment to execute the command in
   *
   * @return {boolean} true if the command can be executed
   */
  public canExecute(command: string, context: object): boolean;

  /**
   * Clear the command stack, erasing all undo / redo history
   */
  public clear(): void;

  /**
   * Undo last command(s)
   */
  public undo(): void;

  /**
   * Redo last command(s)
   */
  public redo(): void;

  /**
   * Register a handler instance with the command stack
   *
   * @param {string} command
   * @param {CommandHandler} handler
   */
  public register(command: string, handler: CommandHandler): void;

  /**
   * Register a handler type with the command stack
   * by instantiating it and injecting its dependencies.
   *
   * @param {string} command
   * @param {Function} handlerCls a constructor for a {@link CommandHandler}
   */
  public registerHandler(command: string, handlerCls: CommandHandler): void;

  public canUndo(): boolean;

  public canRedo(): boolean;
}

export declare type CommandHandler = (...args: any[]) => void;

export declare class ContextPad {
  /**
   * Close the context pad
   */
  public close(): void;

  /**
   * Check if pad is open.
   *
   * If target is provided, check if it is opened
   * for the given target (single or multiple elements).
   *
   * @param {ContextPadTarget} [target]
   * @return {boolean}
   */
  public isOpen(target?: ContextPadTarget): boolean;

  /**
   * Get context pad entries for given elements.
   *
   * @param {ContextPadTarget} target
   *
   * @return {ContextPadEntryDescriptor[]} list of entries
   */
  public getEntries(target: ContextPadTarget): ContextPadEntryDescriptor[];

  /**
   * Trigger context pad action.
   *
   * @param  {string} action
   * @param  {Event} event
   * @param  {boolean} [autoActivate=false]
   */
  public trigger(action: string, event: Event, autoActivate?: boolean): void;


  /**
   * Open the context pad for given elements.
   *
   * @param {ContextPadTarget} target
   * @param {boolean} [force=false] - Force re-opening context pad.
   */
  public open(target: ContextPadTarget, force?: boolean): void;

  /**
   * @param {ContextPadTarget} target
   *
   * @return {Overlay}
   */
  public getPad(target: ContextPadTarget): Overlay;

  /**
   * Register context pad provider.
   *
   * @param  {number} [priority=1000]
   * @param  {ContextPadProvider} provider
   *
   * @example
   * const contextPadProvider = {
   *   getContextPadEntries: function(element) {
   *     return function(entries) {
   *       return {
   *         ...entries,
   *         'entry-1': {
   *           label: 'My Entry',
   *           action: function() { alert("I have been clicked!"); }
   *         }
   *       };
   *     }
   *   },
   *
   *   getMultiElementContextPadEntries: function(elements) {
   *     // ...
   *   }
   * };
   *
   * contextPad.registerProvider(800, contextPadProvider);
   */
  public registerProvider(priority: number, provider: ContextPadProvider): void;

  /**
   * A context pad that displays element specific, contextual actions next
   * to a diagram element.
   *
   * @param {Canvas} canvas
   * @param {Object} config
   * @param {boolean|Object} [config.scale={ min: 1.0, max: 1.5 }]
   * @param {number} [config.scale.min]
   * @param {number} [config.scale.max]
   * @param {EventBus} eventBus
   * @param {Overlays} overlays
   */
  constructor(canvas: Canvas, config: object, eventBus: EventBus, overlays: Overlays);
}


export declare interface ContextPadTarget {
}

export declare interface ContextPadEntryDescriptor {
}

export declare interface ContextPadProvider {
  getContextPadEntries(element: any): any;

  getMultiElementContextPadEntries(elements: any): any;
}

export declare interface OverlayShowConfiguration {
  minZoom?: number;
  maxZoom?: number;
}

export declare interface OverlayPositionConfiguration {
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
}

export declare interface OverlayScaleConfiguration {
  min?: number;
  max: number;
}

export declare interface Overlay {
  show?: OverlayShowConfiguration;
  position?: OverlayPositionConfiguration;
  scale?: boolean | OverlayScaleConfiguration;
  html: string | HTMLElement;
}

export declare interface OverlaySearch {
  id?: string;
  element?: string | djs.model.Base;
  type?: string;
}

export declare class Overlays {
  /**
   * Adds a HTML overlay to an element.
   *
   * @param {string|djs.model.Base}   element   attach overlay to this shape
   * @param {Object}                  overlay   the overlay configuration
   *
   * @param {string|HTMLElement}       overlay.html                 html element to use as an overlay
   * @param {Object}                  [overlay.show]               show configuration
   * @param {number}                  [overlay.show.minZoom]       minimal zoom level to show the overlay
   * @param {number}                  [overlay.show.maxZoom]       maximum zoom level to show the overlay
   * @param {Object}                  overlay.position             where to attach the overlay
   * @param {number}                  [overlay.position.left]      relative to element bbox left attachment
   * @param {number}                  [overlay.position.top]       relative to element bbox top attachment
   * @param {number}                  [overlay.position.bottom]    relative to element bbox bottom attachment
   * @param {number}                  [overlay.position.right]     relative to element bbox right attachment
   * @param {boolean|Object}          [overlay.scale=true]         false to preserve the same size regardless of
   *                                                               diagram zoom
   * @param {number}                  [overlay.scale.min]
   * @param {number}                  [overlay.scale.max]
   *
   * @return {string}                 id that may be used to reference the overlay for update or removal
   */
  public add(element: string | djs.model.Base, overlay: Overlay): string;
  /**
   * Adds a HTML overlay to an element.
   *
   * @param {string|djs.model.Base}   element   attach overlay to this shape
   * @param {string}                  [type]    optional type to assign to the overlay
   * @param {Object}                  overlay   the overlay configuration
   *
   * @param {string|DOMElement}       overlay.html                 html element to use as an overlay
   * @param {Object}                  [overlay.show]               show configuration
   * @param {number}                  [overlay.show.minZoom]       minimal zoom level to show the overlay
   * @param {number}                  [overlay.show.maxZoom]       maximum zoom level to show the overlay
   * @param {Object}                  overlay.position             where to attach the overlay
   * @param {number}                  [overlay.position.left]      relative to element bbox left attachment
   * @param {number}                  [overlay.position.top]       relative to element bbox top attachment
   * @param {number}                  [overlay.position.bottom]    relative to element bbox bottom attachment
   * @param {number}                  [overlay.position.right]     relative to element bbox right attachment
   * @param {boolean|Object}          [overlay.scale=true]         false to preserve the same size regardless of
   *                                                               diagram zoom
   * @param {number}                  [overlay.scale.min]
   * @param {number}                  [overlay.scale.max]
   *
   * @return {string}                 id that may be used to reference the overlay for update or removal
   */
  public add(element: string | djs.model.Base, type: string, overlay: Overlay): string;

  /**
   * Remove an overlay with the given id or all overlays matching the given filter.
   *
   * @see Overlays#get for filter options.
   *
   * @param {string|object} [filter]
   */
  public remove(filter: string | object): void;

  public show(): void;

  public hide(): void;

  public clear(): void;


  public get(search: OverlaySearch): object | object[];
}

export declare class CopyPaste {
  /**
   * Copy elements.
   *
   * @param {Array<djs.model.Base>} elements
   *
   * @returns {Object}
   */
   public copy(elements: djs.model.Base[]): object;

  /**
   * Paste elements.
   *
   * @param {Object} [context]
   * @param {djs.model.base} [context.element] - Parent.
   * @param {Point} [context.point] - Position.
   * @param {Object} [context.hints] - Hints.
   */
   public paste(context?: CopyPasteContext): void;

  /**
   * Check wether element has relations to other elements e.g. attachers, labels and connections.
   *
   * @param  {Object} element
   * @param  {Array<djs.model.Base>} elements
   *
   * @returns {boolean}
   */
   public hasRelations(element: object, elements: djs.model.Base[]): boolean;

  /**
   * Create a tree-like structure from elements.
   *
   * @example
   * tree: {
   *  0: [
   *    { id: 'Shape_1', priority: 1, ... },
   *    { id: 'Shape_2', priority: 1, ... },
   *    { id: 'Connection_1', source: 'Shape_1', target: 'Shape_2', priority: 3, ... },
   *    ...
   *  ],
   *  1: [
   *    { id: 'Shape_3', parent: 'Shape1', priority: 1, ... },
   *    ...
   *  ]
   * };
   *
   * @param  {Array<djs.model.base>} elements
   *
   * @return {Object}
   */
   public createTree(elements: djs.model.Base[]): object;


   public createConnection(attrs: any[]): djs.model.Connection;

   public createLabel(attrs: any[]): any;

   public createShape(attrs: any[]): djs.model.Shape;
}

export interface CopyPasteContext {
  element?: djs.model.Base;
  point?: Point;
  hints?: object;
}

export default Viewer;