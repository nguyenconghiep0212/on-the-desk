import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import { keyToUrl, platforms } from "./platforms";
import IcDnD from "assests/icon/ic-dnd.svg";
import { Icon } from "@iconify/react";

export function onOpenContact(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}
export function EditDnD({ data }) {
  const [items, setItems] = useState(
    data.map((e) => {
      return { ...e, id: uuid() };
    })
  );
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    margin: `0 0 8px 0`,
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver) => ({
    background: "transparent",
    width: "100%",
  });
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(reorderedItems);
  }
  useEffect(() => {}, [items]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((e, index) => (
              <Draggable key={e.id} draggableId={e.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    key={index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div className="flex">
                      <div className="flex items-center justify-center w-6">
                        <img src={IcDnD} alt="IcDnD" />
                      </div>
                      <div
                        className="flex items-center justify-start w-full cursor-pointer h-9"
                        onClick={() => {
                          onOpenContact(e.url);
                        }}
                      >
                        <div
                          className="flex items-center justify-center w-10 h-[inherit] rounded-tl-md rounded-bl-md"
                          style={{
                            background: platforms.find(
                              (f) => f.key === e.platform
                            )?.color,
                          }}
                        >
                          <img
                            src={
                              keyToUrl.find(
                                (item) =>
                                  item.key ===
                                  platforms.find((f) => f.key === e.platform)
                                    ?.key
                              )?.url
                            }
                            alt="platform logo"
                          />
                        </div>
                        <div
                          className="flex items-center justify-start w-[calc(100%-40px)] h-[inherit] px-4 rounded-tr-md rounded-br-md"
                          style={{
                            background: `${
                              platforms.find((f) => f.key === e.platform)
                                ?.background_color
                            }`,
                          }}
                        >
                          <span
                            className="truncate"
                            style={{
                              color: ["#ffffff", "#fff"].includes(
                                platforms.find((f) => f.key === e.platform)
                                  ?.color
                              )
                                ? "black"
                                : "white ",
                            }}
                          >
                            {e.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-6">
                        <Icon className="text-[#EB5757]" icon="tabler:trash"/>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
