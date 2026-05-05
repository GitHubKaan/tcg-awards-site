import { useRef, useState, useEffect, useCallback } from "react";
import "./downloads.page.css";
import DownloadIcon from "../assets/download_icon.png";
import PreviewImage1 from "../assets/download_preview/TCG_Awards_SM_Votes_V_1920x1080.jpg";
import PreviewImage3 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1080x1350.jpg";
import PreviewImage2 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1080x1080.jpg";
import PreviewImage4 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1080x1920.jpg";
import PreviewImage5 from "../assets/download_preview/TCG_Awards_SM_Votes_V1_1920x1080.jpg";
import PreviewImage6 from "../assets/download_preview/TCG_Awards_SM_Votes_V2_1080x1080.jpg";
import PreviewImage7 from "../assets/download_preview/TCG_Awards_SM_Votes_V2_1080x1350.jpg";
import PreviewImage8 from "../assets/download_preview/TCG_Awards_SM_Votes_V2_1080x1920.jpg";

const IMAGES = [
    PreviewImage1,
    PreviewImage2,
    PreviewImage3,
    PreviewImage4,
    PreviewImage5,
    PreviewImage6,
    PreviewImage7,
    PreviewImage8,
];

const SCROLL_STEP = 320;

function DownloadsPage() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Drag state
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const updateArrows = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 1);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        updateArrows();
        el.addEventListener("scroll", updateArrows, { passive: true });
        const ro = new ResizeObserver(updateArrows);
        ro.observe(el);
        return () => {
            el.removeEventListener("scroll", updateArrows);
            ro.disconnect();
        };
    }, [updateArrows]);

    // Mouse drag handlers
    const onMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
        scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
        scrollRef.current?.classList.add("dragging");
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const el = scrollRef.current;
        if (!el) return;
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX.current) * 1.2;
        el.scrollLeft = scrollLeft.current - walk;
    };

    const onMouseUp = () => {
        isDragging.current = false;
        scrollRef.current?.classList.remove("dragging");
    };

    const onMouseLeave = () => {
        if (isDragging.current) {
            isDragging.current = false;
            scrollRef.current?.classList.remove("dragging");
        }
    };

    const scrollBy = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: direction === "right" ? SCROLL_STEP : -SCROLL_STEP, behavior: "smooth" });
    };

    const handleMediaPackDownload = () => {
        const link = document.createElement("a");
        link.href = "/downloads/TCG_Awards_SM_Votes_V1.zip";
        link.download = "TCG_Awards_SM_Votes_V1.zip";
        link.click();
    };

    return (
        <div id="downloads-page" className="default-page">
            <div className="w-100 flex column gap">
                <h1>Downloads</h1>

                <h3>Media Category</h3>

                <div className="flex column gap-1">
                    <div className="preview-wrapper no-select">
                        {/* Left arrow */}
                        <button
                            className={`scroll-arrow scroll-arrow--left ${canScrollLeft ? "visible" : ""}`}
                            onClick={() => scrollBy("left")}
                            aria-label="Scroll left"
                        >
                            ‹
                        </button>

                        {/* Scrollable track */}
                        <div
                            className="preview"
                            ref={scrollRef}
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseLeave}
                        >
                            {IMAGES.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`mediapack preview ${i + 1}`}
                                    draggable={false}
                                />
                            ))}
                        </div>

                        {/* Right arrow */}
                        <button
                            className={`scroll-arrow scroll-arrow--right ${canScrollRight ? "visible" : ""}`}
                            onClick={() => scrollBy("right")}
                            aria-label="Scroll right"
                        >
                            ›
                        </button>
                    </div>

                    <button className="download-button" onClick={handleMediaPackDownload}>
                        <h5 className="text-left">Download Vote-Me Media Kit</h5>
                        <img src={DownloadIcon} alt="download icon" width={20} height={20} />
                    </button>

                    <p>Use this kit for your social channels. Free of usage. Please use for promotional purposes only.</p>
                </div>
            </div>
        </div>
    );
}

export default DownloadsPage;