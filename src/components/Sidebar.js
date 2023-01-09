import React from 'react';
import { useState } from 'react';
import Styles from "../css/sidebar.module.css"
import { FiChevronDown, FiChevronUp, FiFilter } from "react-icons/fi";
import { useGlobalContext } from "../context";

const Sidebar = () => {
    const { categoryList, colorList, valueFilter, setValueFilter, changeFilter, setChangeFilter } = useGlobalContext();
    const [showFilterCatogory, setShowFilterCatogory] = useState(true);
    const [showFilterPrice, setShowFilterPrice] = useState(true);
    const [showFilterColors, setShowFilterColors] = useState(true);
    const handleChange = (e) => {
        let newValueFilter = valueFilter;
        let valueCategory = document.querySelectorAll('input[name="category"]');
        let valueColor = document.querySelectorAll('input[name="color"]');
        let valuePrice = document.querySelectorAll('input[name="price"]');
        valueCategory.forEach((category) => {
            if(category.checked) {
                if(!newValueFilter.category.includes(category.value))
                newValueFilter.category.push(category.value);
            } else {
                let position = newValueFilter.category.indexOf(category.value);
                if(position !== -1) {
                    newValueFilter.category.splice(position, 1);
                }
            }
        })
        valueColor.forEach((color) => {
            if(color.checked) {
                if(!newValueFilter.color.includes(color.value))
                newValueFilter.color.push(color.value);
            } else {
                let position = newValueFilter.color.indexOf(color.value);
                if(position !== -1) {
                    newValueFilter.color.splice(position, 1);
                }
            }
        })
        valuePrice.forEach((price) => {
            if(price.checked) {
                if(!newValueFilter.price.includes(price.value))
                newValueFilter.price.push(price.value);
            } else {
                let position = newValueFilter.price.indexOf(price.value);
                if(position !== -1) {
                    newValueFilter.price.splice(position, 1);
                }
            }
        })
        setValueFilter(newValueFilter);
        setChangeFilter(!changeFilter);
    }
    return (
        <div>
            <div className={Styles.filter}>
                <span style={{ fontSize: '15px' }}>Filter</span>
                <FiFilter className={Styles.icon_filter} />
            </div>
            <div className={Styles.sub_filter}>
                <div className={Styles.filter_title} onClick={() => setShowFilterCatogory(!showFilterCatogory)}>
                    <span className={Styles.filter_name}>CATEGOTIES</span>
                    {showFilterCatogory ? <FiChevronUp
                        className={Styles.filter_icon}
                    /> : <FiChevronDown
                        className={Styles.filter_icon}
                    />}
                </div>
                {showFilterCatogory && <>
                    {categoryList.map((category) => {
                        return (
                            <div key={category.id} className={Styles.form_group_checkbox}>
                                <input type="checkbox" id="ao" value="ao" name="category" className={Styles.input_checkbox} onChange={handleChange} />
                                <label className={Styles.input_label}>{category.name}</label>
                            </div>
                        )
                    })}
                </>}
            </div>

            <div className={Styles.sub_filter}>
                <div className={Styles.filter_title} onClick={() => setShowFilterColors(!showFilterColors)}>
                    <span className={Styles.filter_name}>COLORS</span>
                    {showFilterColors ? <FiChevronUp
                        className={Styles.filter_icon}
                    /> : <FiChevronDown
                        className={Styles.filter_icon}
                    />}
                </div>
                {showFilterColors && <>
                    {colorList.map((color) => {
                        return (
                            <div key={color.id} className={Styles.form_group_checkbox}>
                                <input type="checkbox" id={color.name} value={color.name} name="color" className={Styles.input_checkbox} onChange={handleChange} />
                                <label htmlFor={color.name} className={Styles.input_label}>{color.name}</label>
                                <div className={Styles.color_filer} style={{ backgroundColor: `${color.code}` }}></div>
                            </div>
                        )
                    })}
                </>}
            </div>

            <div className={Styles.sub_filter}>
                <div className={Styles.filter_title} onClick={() => setShowFilterPrice(!showFilterPrice)}>
                    <span className={Styles.filter_name}>PRICE</span>
                    {showFilterPrice ? <FiChevronUp
                        className={Styles.filter_icon}
                    /> : <FiChevronDown
                        className={Styles.filter_icon}
                    />}
                </div>
                {showFilterPrice && <>
                    <div className={Styles.form_group_checkbox}>
                        <input type="checkbox" id="1" value="1" name="price" className={Styles.input_checkbox} onChange={handleChange} />
                        <label htmlFor="1" className={Styles.input_label}>Dưới 100.000 đ</label>
                    </div>
                    <div className={Styles.form_group_checkbox}>
                        <input type="checkbox" id="2" value="2" name="price" className={Styles.input_checkbox} onChange={handleChange} />
                        <label htmlFor="2" className={Styles.input_label}>Từ 100.000 - 200.000 đ</label>
                    </div>
                    <div className={Styles.form_group_checkbox}>
                        <input type="checkbox" id="3" value="3" name="price" className={Styles.input_checkbox} onChange={handleChange} />
                        <label htmlFor="3" className={Styles.input_label}>Từ 200.000 - 500.000 đ</label>
                    </div>
                    <div className={Styles.form_group_checkbox}>
                        <input type="checkbox" id="4" value="4" name="price" className={Styles.input_checkbox} onChange={handleChange} />
                        <label htmlFor="4" className={Styles.input_label}>Từ 500.000 trở lên</label>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Sidebar