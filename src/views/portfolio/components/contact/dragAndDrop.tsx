import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import IcDnD from "assests/icon/ic-dnd.svg";
import { Icon } from "@iconify/react";

export function EditDnD({ dndItems, setDndItems }) {
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
      dndItems,
      result.source.index,
      result.destination.index
    );
    setDndItems(reorderedItems);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {dndItems.map((e, index) => (
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
                      <div className="flex items-center justify-start w-full cursor-pointer h-9">
                        <div
                          className={`flex items-center justify-center w-10 h-[inherit] rounded-tl-md rounded-bl-md ${
                            e.keyContact === "phone"
                              ? "bg-[#01B634]"
                              : "bg-white"
                          }`}
                        >
                          <img
                            src={`${process.env.REACT_APP_BASE_IMG}${e.linkIcon}`}
                            alt="platform logo"
                          />
                        </div>
                        <div
                          className="flex items-center justify-start w-[calc(100%-40px)] h-[inherit] px-4 rounded-tr-md rounded-br-md"
                          style={{
                            backgroundColor: `${e.backgoundColor}`,
                          }}
                        >
                          <span className="text-white truncate">
                            {e.nameContact}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-6">
                        <Icon className="text-[#EB5757]" icon="tabler:trash" />
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
