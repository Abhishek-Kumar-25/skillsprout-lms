import Sidebar from "./Sidebar";

export default function PageLayout({
    children
}) {

    return (

        <div

            style={{

                display: "flex",

                minHeight: "100vh",

                background: "#F5F7FB"
            }}
        >

            <Sidebar />

            <div

                style={{

                    marginLeft: "260px",

                    width: "100%",

                    minHeight: "100vh",

                    padding: "25px"
                }}
            >

                {children}

            </div>

        </div>
    );
}