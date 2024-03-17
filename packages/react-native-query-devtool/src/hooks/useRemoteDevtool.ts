import { useEffect, useRef, useState } from "react";

import { Platform } from "react-native";

import {
  ListenerEventType,
  QueryDevtoolData,
  QueryDevtoolProps,
} from "../types";
import debounce from "../utils/debounce";
import { isDevMode } from "../utils/isDevMode";
import {
  getQueryDevtoolData,
  handleQueryDevtoolData,
} from "../utils/queryListener";

const PORT = 9017;

const useRemoteDevtool = (props: QueryDevtoolProps) => {
  const { queryClient, version = "v5" } = props;

  const websocket = useRef<WebSocket>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const queryDevtoolDataRef = useRef<QueryDevtoolData[]>([]);

  const [connected, setConnnected] = useState(false);

  const sendData = (changes: unknown) => {
    try {
      websocket.current?.send(JSON.stringify(changes));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (!queryClient || !isDevMode()) return;

    const createWebSocket = () => {
      websocket.current = new WebSocket(
        Platform.OS === "ios"
          ? `ws://localhost:${PORT}`
          : `ws://10.0.2.2:${PORT}`,
      );

      // When connection is established with server, all queries are sent once
      websocket.current.onopen = () => {
        setConnnected(true);
        console.log("✅ Conected with Native Query Devtool");

        const allQueries = queryClient
          .getQueryCache()
          .getAll()
          .map((queriesData: any) => getQueryDevtoolData(version, queriesData));

        sendData(allQueries);
      };

      websocket.current.onclose = () => {
        setConnnected(false);
        timeoutRef.current = setTimeout(createWebSocket, 1000);
      };
    };

    createWebSocket();

    return () => {
      if (websocket.current) {
        websocket.current.close();
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!connected) return;

    const debounceProcessAndSendData = debounce(
      (queryData: QueryDevtoolData[]) => sendData(queryData),
      400,
    );

    const subscribe = queryClient.getQueryCache().subscribe((listener: any) => {
      if (!listener) {
        return;
      }

      const listenerType: ListenerEventType = listener.type;
      const queryKey = listener.query.queryKey;

      if (!queryKey) {
        return;
      }

      const query = listener.query;

      let queryKeyIndex = queryDevtoolDataRef.current.findIndex(
        (item) => item.queryKey === queryKey,
      );

      queryDevtoolDataRef.current = handleQueryDevtoolData(
        version,
        listenerType,
        queryKeyIndex,
        query,
        queryDevtoolDataRef.current,
      );

      debounceProcessAndSendData(queryDevtoolDataRef.current);
    });

    return () => {
      if (connected) {
        subscribe();
      }
    };
  }, [connected, queryClient, version]);
};

export default useRemoteDevtool;
