
export interface ConsoleEventInit {

    type: ConsoleEventType;
    arguments: any[];

}

export class ConsoleEvent {

    type: ConsoleEventType;
    arguments: any[];
    private _defaultPrevented: boolean;

    constructor(init: ConsoleEventInit) {
        this.type = init.type;
        this.arguments = init.arguments;
        this._defaultPrevented = false;
    }

    preventDefault(){
        this._defaultPrevented = true;
    }

    get defaultPrevented() : boolean {
        return this._defaultPrevented
    }

}

export type ConsoleEventCallback = (e: ConsoleEvent) => void;

const __consoleHook = console;

type ConsoleEventType = 
'assert' |
'clear' |
'count' |
'countReset' |
'debug' |
'dir' |
'dirxml' |
'error' |
'exception' |
'group' |
'groupCollapsed' |
'groupEnd' |
'info' |
'log' |
'table' |
'time' |
'timeEnd' |
'timeLog' |
'trace' |
'warn' |
'markTimeline' |
'profile' |
'profileEnd' |
'timeStamp' |
'timeline' |
'timelineEnd'
;

//TODO: tests required

class ConsoleWithEvents implements Console {

    memory: any;
    Console: any;

    private listeners: {[key: string]: ConsoleEventCallback[]};
    
    get default() {
        return __consoleHook
    }

    constructor() {
        this.listeners = {};
    }

    addEventListener(eventType: ConsoleEventType, listener: ConsoleEventCallback) {
        if(!this.listeners[eventType]) this.listeners[eventType] = [];
        this.listeners[eventType].push(listener);
    }

    dispatchEvent(e: ConsoleEvent){
        if(this.listeners[e.type]) {
            for(let l of this.listeners[e.type]){
                l(e);
            }
        };
        if(!e.defaultPrevented) {
            //@ts-ignore
            __consoleHook[e.type](...e.arguments);
        }
    }

    removeEventListener(eventType: ConsoleEventType, listener: ConsoleEventCallback) : boolean {
        let lIdx = 0, removed = false;
        while(lIdx < this.listeners[eventType].length){
            let l = this.listeners[eventType][lIdx];
            if(l === listener) {
                this.listeners[eventType].splice(lIdx, 1);
                removed = true;
            }
            else lIdx++;
        }
        return removed;
    }

    assert(value: any, message?: string, ...optionalParams: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'assert',
            arguments: [value, message, ...optionalParams]
        }));
    }
    /**
     * When `stdout` is a TTY, calling `console.clear()` will attempt to clear the TTY.
     * When `stdout` is not a TTY, this method does nothing.
     */
    clear(): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'clear',
            arguments: []
        }));
    }
    /**
     * Maintains an internal counter specific to `label` and outputs to `stdout` the number of times `console.count()` has been called with the given `label`.
     */
    count(label?: string): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'count',
            arguments: [label]
        }))
    }
    /**
     * Resets the internal counter specific to `label`.
     */
    countReset(label?: string): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'countReset',
            arguments: [label]
        }))
    }
    /**
     * The `console.debug()` function is an alias for {@link console.log()}.
     */
    debug(message?: any, ...optionalParams: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'debug',
            arguments: [message, ...optionalParams]
        }))
    }
    /**
     * Uses {@link util.inspect()} on `obj` and prints the resulting string to `stdout`.
     * This function bypasses any custom `inspect()` function defined on `obj`.
     */
    dir(obj: any, options?: NodeJS.InspectOptions): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'dir',
            arguments: [obj, options]
        }))
    }
    /**
     * This method calls {@link console.log()} passing it the arguments received. Please note that this method does not produce any XML formatting
     */
    dirxml(...data: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'dirxml',
            arguments: [...data]
        }))
    }
    /**
     * Prints to `stderr` with newline.
     */
    error(message?: any, ...optionalParams: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'error',
            arguments: [message, ...optionalParams]
        }))
    }

    exception(message?: string, ...optionalParams: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'exception',
            arguments: [message, ...optionalParams]
        }))
    }
    /**
     * Increases indentation of subsequent lines by two spaces.
     * If one or more `label`s are provided, those are printed first without the additional indentation.
     */
    group(...label: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'group',
            arguments: [...label]
        }))
    }
    /**
     * The `console.groupCollapsed()` function is an alias for {@link console.group()}.
     */
    groupCollapsed(...label: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'groupCollapsed',
            arguments: [...label]
        }))
    }
    /**
     * Decreases indentation of subsequent lines by two spaces.
     */
    groupEnd(): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'groupEnd',
            arguments: []
        }))
    }
    /**
     * The {@link console.info()} function is an alias for {@link console.log()}.
     */
    info(message?: any, ...optionalParams: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'info',
            arguments: [message, ...optionalParams]
        }))
    }
    /**
     * Prints to `stdout` with newline.
     */
    log(message?: any, ...optionalParams: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'log',
            arguments: [message, ...optionalParams]
        }))
    }
    /**
     * This method does not display anything unless used in the inspector.
     *  Prints to `stdout` the array `array` formatted as a table.
     */
    table(tabularData: any, properties?: string[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'table',
            arguments: [tabularData, properties]
        }))
    }
    /**
     * Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique `label`.
     */
    time(label?: string): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'time',
            arguments: [label]
        }))
    }
    /**
     * Stops a timer that was previously started by calling {@link console.time()} and prints the result to `stdout`.
     */
    timeEnd(label?: string): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'timeEnd',
            arguments: [label]
        }))
    }
    /**
     * For a timer that was previously started by calling {@link console.time()}, prints the elapsed time and other `data` arguments to `stdout`.
     */
    timeLog(label?: string, ...data: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'timeLog',
            arguments: [label, ...data]
        }))
    }
    /**
     * Prints to `stderr` the string 'Trace :', followed by the {@link util.format()} formatted message and stack trace to the current position in the code.
     */
    trace(message?: any, ...optionalParams: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'trace',
            arguments: [message, ...optionalParams]
        }))
    }
    /**
     * The {@link console.warn()} function is an alias for {@link console.error()}.
     */
    warn(message?: any, ...optionalParams: any[]): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'warn',
            arguments: [message, ...optionalParams]
        }))
    }

    // --- Inspector mode only ---
    /**
     * This method does not display anything unless used in the inspector.
     *  The console.markTimeline() method is the deprecated form of console.timeStamp().
     *
     * @deprecated Use console.timeStamp() instead.
     */
    markTimeline(label?: string): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'markTimeline',
            arguments: [label]
        }))
    }
    /**
     * This method does not display anything unless used in the inspector.
     *  Starts a JavaScript CPU profile with an optional label.
     */
    profile(label?: string): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'profile',
            arguments: [label]
        }))
    }
    /**
     * This method does not display anything unless used in the inspector.
     *  Stops the current JavaScript CPU profiling session if one has been started and prints the report to the Profiles panel of the inspector.
     */
    profileEnd(label?: string): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'profileEnd',
            arguments: [label]
        }))
    }
    /**
     * This method does not display anything unless used in the inspector.
     *  Adds an event with the label `label` to the Timeline panel of the inspector.
     */
    timeStamp(label?: string): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'timeStamp',
            arguments: [label]
        }))
    }
    /**
     * This method does not display anything unless used in the inspector.
     *  The console.timeline() method is the deprecated form of console.time().
     *
     * @deprecated Use console.time() instead.
     */
    timeline(label?: string): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'timeline',
            arguments: [label]
        }))
    }
    /**
     * This method does not display anything unless used in the inspector.
     *  The console.timelineEnd() method is the deprecated form of console.timeEnd().
     *
     * @deprecated Use console.timeEnd() instead.
     */
    timelineEnd(label?: string): void {
        this.dispatchEvent(new ConsoleEvent({
            type: 'timelineEnd',
            arguments: [label]
        }))
    }

    
}

const consoleW = new ConsoleWithEvents();

//@ts-ignore
console = consoleW;

export { consoleW as console }