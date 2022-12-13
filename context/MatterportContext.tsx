import { createContext, useContext, useEffect, useState } from "react";

type MatterportProviderProps = {
  children: React.ReactNode;
};

type MatterportContextProps = {
  mpSdk: any;
  setMpSdk: any;
  flyToTag: (tag: string) => void;
  tags: string[];
  hideTags: (listOfTags: string[]) => void;
  changeTagColor: (r: number, g: number, b: number) => void;
  preventTagAction: (tag: string) => void;
};

declare global {
  interface Window {
    MP_SDK: any;
    showcase: any;
  }
}

const MatterportContext = createContext({} as MatterportContextProps);

export const useMatterport = () => {
  return useContext(MatterportContext);
};

export const MatterportProvider = ({ children }: MatterportProviderProps) => {
  const [mpSdk, setMpSdk] = useState<any>({});
  const [tags, setTags] = useState<any>([]);

  useEffect(() => {
    if (Object.keys(mpSdk).length !== 0) {
      mpSdk.Mattertag.getData().then((res: any) => {
        setTags(res);
      });
    }
  }, [mpSdk]);

  // check if tags from matterport is equal to any of the tags provided in the list. else hide the tag
  const hideTags = (listOfTags: string[]) => {
    // sleep for 3 second
    setTimeout(() => {
      for (let i = 0; i < tags.length; i++) {
        if (!listOfTags.includes(tags[i].sid)) {
          mpSdk.Mattertag.remove(tags[i].sid);
        }
      }
    }, 1000);
  };

  const changeTagColor = (red: number, green: number, blue: number) => {
    for (let i = 0; i < tags.length; i++) {
      mpSdk.Mattertag.editColor(tags[i].sid, {
        r: red,
        g: green,
        b: blue,
      });
    }
  };

  const preventTagAction = (tags: any) => {
    tags.map((tag: any) => {
      mpSdk.Mattertag.preventAction(tag.sid, {
        opening: true,
      });
    });
  };

  function flyToTag(tag: string) {
    mpSdk.Mattertag.navigateToTag(tag, mpSdk.Mattertag.Transition.FLY);
  }

  return (
    <MatterportContext.Provider
      value={{
        mpSdk,
        setMpSdk,
        flyToTag,
        hideTags,
        changeTagColor,
        tags,
        preventTagAction,
      }}
    >
      {children}
    </MatterportContext.Provider>
  );
};
