// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.invokeFetchSubreddit": {
      type: "done.invoke.invokeFetchSubreddit";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.invokeFetchSubreddit": {
      type: "error.platform.invokeFetchSubreddit";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    invokeFetchSubreddit: "done.invoke.invokeFetchSubreddit";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    doneLoading: "done.invoke.invokeFetchSubreddit";
    select: "SELECT";
  };
  eventsCausingServices: {
    invokeFetchSubreddit: "SELECT";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "idle"
    | "selected"
    | "selected.failed"
    | "selected.loaded"
    | "selected.loading"
    | { selected?: "failed" | "loaded" | "loading" };
  tags: never;
}
