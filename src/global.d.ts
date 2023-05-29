declare type ViewType =
  | undefined
  | {
      html: string;
      componentName?: never;
      props?: never;
      slots?: never;
      listeners?: never;
    }
  | {
      html?: never;
      componentName: string;
      props?: any;
      slots?: any;
      listeners?: any;
    };

declare type ComposerId = {
  parentMessageId: number | null;
  user: string | null;
  group: string | null;
};
declare type EntityType = CometChat.User | CometChat.Group;
declare module "*.svg";
declare module "*.png";
declare module "*.wav";
declare module "*.jpeg";
declare module "*.mp4";
declare module "*.mp3";
declare module "*.pdf";
