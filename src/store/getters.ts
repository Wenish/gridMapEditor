import { GetterTree } from "vuex";
import { FloorBlock, FloorBlockTypes, FileData, ToolTypes } from "../types";
import { State } from "./state";

export type Getters = {
    getFileData(state: State): FileData
    getFloorBlockType(state: State): (key: string) => FloorBlockTypes,
    getSelectedAxis(state: State): { x: number; z: number } | null,
    getAxisFromIndex(state: State): (index: number) => { x: number; z: number }
    getPlacedFloorBlocksCount(state: State): number
}

export const getters: GetterTree<State, State> & Getters = {
    getFileData(state) {
        const floorBlocks = Object.keys(state.floorBlocks).map((key): FloorBlock => {
            console.log(key)
            return state.floorBlocks[key]
        })
        return {
            map: {
                name: state.data.map.name,
                captureFlags: state.data.map.captureFlags,
                capturePoints: state.data.map.capturePoints,
                floorBlocks: floorBlocks
            },
            teams: state.data.teams,
            grid: {
                width: state.grid.width,
                height: state.grid.height,
                cellSize: state.grid.cellSize
            }
        }
    },
    getFloorBlockType(state) {
        return (key: string) => {
            return state.floorBlocks[key]?.type
        }
    },
    getSelectedAxis(state: State) {
        const width = state.grid.width
        const index = state.grid.selectedIndex
        if (index) {
            const x = Math.ceil(index / width);
            const z = ((index - 1) % width) + 1;
            const axis = {
                x,
                z
            }
            return axis
        }
        return null
    },
    getAxisFromIndex(state: State) {
        return (index: number) => {
            const width = state.grid.width
            const x = Math.ceil(index / width);
            const z = ((index - 1) % width) + 1;
            const axis = {
                x,
                z
            }
            return axis
        }
    },
    getPlacedFloorBlocksCount(state: State) {
        return Object.keys(state.floorBlocks).length
    }
}