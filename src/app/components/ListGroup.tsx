import { useState } from "react";

interface ListGroupProps{
    items: string[];
    heading: string;

    onSelectItem: (item: string) => void;
}

export default function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {

    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl max-w-sm w-full space-y-4">
            <h1> {heading} </h1> 
            {items.length === 0 && <p className="text-neutral-400">No items available</p> }
            <ul className="list-disc list-inside text-neutral-400 space-y-1">
                {items.map((item, index) => (
                <li 
                className={ selectedIndex === index ? 'list-group-item active text-neutral-200 cursor-pointer' : 'list-group-item cursor-pointer' } 
                key={item} 
                onClick={ () => {
                    setSelectedIndex(index)
                    onSelectItem(item)
                }}
                >
                    {item}
                </li>
                ))}
            </ul>
        </div>
    )
}

