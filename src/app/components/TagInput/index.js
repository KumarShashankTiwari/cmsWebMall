import React from "react";
import "./index.scss"
import { useState } from "react";

const TagsInput = ({
    tags,
    addTags,
    removeTags }) => {

    return (
        <div className="tags-input">
            <ul>
                {tags.map((tag, index) => (
                    <li key={index} className="tag">
                        <span className='tag-title'>{tag}</span>
                        <span className='tag-close-icon'
                            onClick={() => removeTags(index)}
                        >
                            x
                        </span>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                onKeyUp={event => addTags(event)}
                placeholder="Press enter to add tags"
            />
        </div>
    );
};
export default TagsInput;