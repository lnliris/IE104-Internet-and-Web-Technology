import { useLocation, useNavigate } from "react-router";
import $ from "jquery"
import { useEffect, useState } from "react";
import { get, postWithFile } from "../api/api";

function MenuProfile() {
    // Kiểm tra xem dữ liệu
    const [user, setUser] = useState({ name: "", avatar: "" });
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        // const storedUser = JSON.parse(localStorage.getItem('userProfile'));

        // if (storedUser) {
        //     setUser(storedUser); // Nếu có, gán vào state
        // } else {
        //     // Nếu không có, gọi API để lấy dữ liệu người dùng
        //     const fetchProfile = async () => {
        //         try {
        //             const profileData = await get("/account/profile");
        //             const userProfile = {
        //                 name: profileData.name,
        //                 avatar: profileData.avatar,
        //             };

        //             // Lưu thông tin vào localStorage
        //             localStorage.setItem('userProfile', JSON.stringify(userProfile));

        //             setUser(userProfile); // Cập nhật state với dữ liệu từ API
        //             console.log(profileData);
        //         } catch (error) {
        //             console.error("Lỗi khi lấy thông tin hồ sơ:", error);
        //         }
        //     };

        //     fetchProfile();
        // }

        const fetchProfile = async () => {


            try {
                const profileData = await get("/account/profile"); // Gọi API
                setUser({
                    name: profileData.name,
                    avatar: profileData.avatar,
                })
                console.log(profileData)
            } catch (error) {
                console.error("Lỗi khi lấy thông tin hồ sơ:", error);
            }
        };

        fetchProfile();

        do_bind_event();
        init_menu_bar();

    }, [])

    const locat = useLocation();
    const navi = useNavigate();

    const init_menu_bar = () => {
        const path = locat.pathname.split("/")[2];
        $(`.menu_profile[data-name='${path}']`).addClass("menu_profile_active");

    }

    var do_bind_event = () => {
        $(".menu_profile").on("click", function () {
            var $this = $(this);
            var { name } = $this.data();

            navi(`/profile/${name}`)
        })
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleAvatarUpload = async () => {
        if (!selectedFile) {
            alert("Vui lòng chọn file avatar");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try {
            const response = await postWithFile("/account/update-avatar", formData);
            setUser((prevUser) => ({
                ...prevUser,
                avatar: response.avatar,
            }));
            alert(response.message || "Cập nhật avatar thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật avatar:", error);
            alert("Cập nhật avatar thất bại!");
        }
    };

    useEffect(() => {
        if (selectedFile) {
            handleAvatarUpload();
        }
    }, [selectedFile]);

    return (
        <section>
            <div className="w-100" style={{ "height": "40dvh" }}>
                <img className="w-100 h-100" style={{ "objectFit": "cover" }} src="https://imgs.search.brave.com/9Ub654WB1GKvh5PKjOLNBUsu8cb_3IuqY1izfUuvSlk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlltVTJOVE5p/TVRjdFkyTmxPUzAw/TVdReExUbGlOalF0/WldSa00yRXhNMkU0/TjJZMlhrRXlYa0Zx/Y0dkZVFWUm9hWEpr/VUdGeWRIbEpibWRs/YzNScGIyNVhiM0py/Wm14dmR3QEAuX1Yx/X1FMNzVfVVg1MDBf/Q1IwLDAsNTAwLDI4/MV8uanBn" />
            </div>
            <div className="flex f-col" style={{ "transform": "translateY(-120px)", "position": "relative", "padding": "0 5%" }}>
                <div className="flex cenhor gap20">
                    <img
                        width="200"
                        height="200"
                        style={{ "objectFit": "cover", "borderRadius": "50%" }}
                        src={user.avatar}
                        alt="User Avatar"
                    />

                    <label
                        htmlFor="upload-avatar"
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "20px",
                            background: "white",
                            borderRadius: "50%",
                            padding: "10px",
                            cursor: "pointer",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <i className="fas fa-camera" style={{ fontSize: "18px" }}></i>
                    </label>
                    <input
                        type="file"
                        id="upload-avatar"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange} // Khi chọn file, gọi hàm xử lý
                    />

                    <div className="flex f-col gap10">
                        <h1
                            className="p-0 product-name mb-5 m-0"
                            style={{ "fontSize": "30px" }}
                        >
                            {user.name}
                        </h1>
                    </div>

                </div>
                <div className="w-100 flex f-col cenhor" style={{ "padding": "3% 2%" }}>
                    <div className="flex spa-bet-ver w-100 mb-10">
                        <p data-name="info" className="menu_profile" style={{ "fontSize": "18px", "color": "white" }}>
                            Thông tin cá nhân
                        </p>
                        <p data-name="history" className="menu_profile" style={{ "fontSize": "18px", "color": "white" }}>
                            Lịch sử giao dịch
                        </p>
                        <p data-name="myorder" className="menu_profile" style={{ "fontSize": "18px", "color": "white" }}>
                            Vé của tôi
                        </p>
                        <p data-name="notify" className="menu_profile" style={{ "fontSize": "18px", "color": "white" }}>
                            Thông báo
                        </p>
                    </div>
                    <div className="line w-100 mt-10" style={{ "height": "2px", "backgroundColor": "white" }}></div>
                </div>
            </div>
        </section>

    )
}

export default MenuProfile;