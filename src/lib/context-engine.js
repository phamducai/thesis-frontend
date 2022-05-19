import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import debugJs from "debug";
const debug = debugJs("context-engine");

const socket = io({
  // autoConnect: false
});

socket.on("connect", () => debug("connect"));
socket.on("disconnect", (reasonStr) => debug("disconnect", reasonStr));
socket.on("connect_error", (err) => debug("connect_error", err.message));
socket.on("message", (topic, message) => {
  let payload = JSON.parse(message);

  if (subscribedTopic.has(topic)) {
    let handles = subscribedTopic.get(topic);
    for (let handle of handles) {
      handle(payload);
    }
  }
});

const subscribedTopic = new Map();

const ContextEngine = {
  subscribe(topic, handle) {
    debug("subscribed to:", topic);
    socket.emit("subscribe", topic);

    if (!subscribedTopic.has(topic)) {
      subscribedTopic.set(topic, new Set([handle]));
    } else {
      let handles = subscribedTopic.get(topic);
      handles.add(handle);
    }
  },

  unsubscribe(topic, handle) {
    debug("unsubscribed from:", topic);
    socket.emit("unsubscribe", topic);

    let handles = subscribedTopic.get(topic);
    handles.delete(handle);
  },
};

function useContextEngine(topic, options) {
  const { initialData } = options;
  const [data, setData] = useState(initialData);

  useEffect(() => {
    ContextEngine.subscribe(topic, setData);

    return () => {
      ContextEngine.unsubscribe(topic, setData);
    };
  }, [topic]);

  return { data };
}

export { useContextEngine };
