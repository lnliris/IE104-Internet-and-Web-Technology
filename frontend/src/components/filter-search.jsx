import { useEffect, useState } from "react";
import search from "../assets/icon/search.png";

const data = [
    { id: 1, name: "A" },
    { id: 2, name: "0A" },
    { id: 3, name: "ÁDSAD" },
];

function FilterSearch(prop) {
    const [selected1, setSelected1] = useState(""); // Trạng thái của dropdown 1
    const [selected2, setSelected2] = useState(""); // Trạng thái của dropdown 2
    const [selected3, setSelected3] = useState(""); // Trạng thái của dropdown 3
    const [selected4, setSelected4] = useState(""); // Trạng thái của dropdown 4

    useEffect(() => {
        prop.event();
    }, []);

    return (
        <section className="center_ul" id="filter-search">
            <div className="select_option">
                <div className="wrap_search_at_filter" style={{ display: "none" }}>
                    <div className="center_ul" id="search_center">
                        <input
                            className="inp_search input_data"
                            data-name="searchKey"
                            type="text"
                            id="search_post_filter"
                        />
                        <button className="search_btn" id="search_post_btn">
                            <img className="icon" src={search} alt="" />
                        </button>
                    </div>
                </div>
                <div>
                    <h3 className="text_upper" style={{ color: "white" }}>
                        Đặt vé nhanh
                    </h3>
                </div>

                {/* Label for Dropdown 1 */}
               
                <select
                    id="dropdown1"
                    className="input_data text_upper"
                    data-name="id01"
                    value={selected1}
                    onChange={(e) => setSelected1(e.target.value)}
                >
                    <option value="" disabled>
                        1. Chọn phim
                    </option>
                    {data.map((item) => (
                        <option key={item.id} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {/* Label for Dropdown 2 */}
               
                <select
                    id="dropdown2"
                    className="input_data text_upper"
                    data-name="id02"
                    value={selected2}
                    onChange={(e) => setSelected2(e.target.value)}
                    disabled={!selected1}
                >
                    <option value="" disabled>
                    2. Chọn rạp
                    </option>
                    <option value="Rạp 1">Rạp 1</option>
                    <option value="Rạp 2">Rạp 2</option>
                </select>

                {/* Label for Dropdown 3 */}
              
                <select
                    id="dropdown3"
                    className="input_data text_upper"
                    data-name="id03"
                    value={selected3}
                    onChange={(e) => setSelected3(e.target.value)}
                    disabled={!selected2}
                >
                    <option value="" disabled>
                    3. Chọn ngày
                    </option>
                    <option value="Ngày 1">Ngày 1</option>
                    <option value="Ngày 2">Ngày 2</option>
                </select>

                {/* Label for Dropdown 4 */}
             
                <select
                    id="dropdown4"
                    className="input_data text_upper"
                    data-name="id04"
                    value={selected4}
                    onChange={(e) => setSelected4(e.target.value)}
                    disabled={!selected3}
                >
                    <option value="" disabled>
                    4. Chọn suất
                    
                    </option>
                    <option value="Suất 1">Suất 1</option>
                    <option value="Suất 2">Suất 2</option>
                </select>

                {/* Button */}
                <button
                    className="btn-save-filter btn_cus"
                    disabled={!selected4}
                >
                    <p style={{ color: "red" }} className="text_upper">
                        Đặt ngay
                    </p>
                </button>
            </div>
        </section>
    );
}

export default FilterSearch;
