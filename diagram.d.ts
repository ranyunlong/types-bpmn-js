import { BaseElement }  from 'bpmn-moddle';
declare class DiagramServiceInstance {
    /**
     * Resolves a diagram service
     * @param name the name of the diagram service to be retrieved
     * @param strict [strict=true] if false, resolve missing services to null
     */
    public get(name: string, strict?: boolean): this;

    public invoke(fn: (...args: any[]) => void): void;

    public fire(): void;

    public add(name: string, overlayNode: OverlayNode): void;

    public remove(name: string): void;
    public remove(options: {element: string}): void;

    /**
     * Event listener
     * @param event 
     * @param listener 
     */
    public on(event: 'element.hover', listener: (e: IEvent ) => void): void;
    public on(event: 'element.out', listener: (e: IEvent) => void): void;
    public on(event: 'element.click', listener: (e: IEvent) => void): void;
    public on(event: 'element.dblclick', listener: (e: IEvent) => void): void;
    public on(event: 'element.mousedown', listener: (e: IEvent) => void): void;
    public on(event: 'element.mouseup', listener: (e: IEvent) => void): void;
    public on(event: string, listener: (e: IEvent) => void): void;
}

declare interface IEvent {
    element: BaseElement;
}

declare interface OverlayNode {
    position: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    },
    html: string | JQuery<HTMLElement>;
}