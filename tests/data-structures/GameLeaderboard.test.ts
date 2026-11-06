import { describe, it, expect, beforeEach } from "vitest";
import { GameLeaderboard, Player } from "../../src/data-structures/GameLeaderboard";

describe("GameLeaderboard", () => {
    let leaderboard: GameLeaderboard;

    const player1: Player = {
        id: "P01",
        name: "An",
        score: 100
    };

    const player2: Player = {
        id: "P02",
        name: "Binh",
        score: 200
    };

    const player3: Player = {
        id: "P03",
        name: "Cuong",
        score: 150
    };

    beforeEach(() => {
        leaderboard = new GameLeaderboard();
    });

    it("thêm người chơi thành công", () => {
        leaderboard.addPlayer(player1);

        expect(leaderboard.getPlayer("P01")).toEqual(player1);
    });

    it("không cho phép ID người chơi trùng lặp", () => {
        leaderboard.addPlayer(player1);

        expect(() => leaderboard.addPlayer(player1)).toThrow(
            "Người chơi đã tồn tại."
        );
    });

    it("không chấp nhận điểm số không hợp lệ", () => {
        expect(() => leaderboard.addPlayer({
            id: "P04",
            name: "Dung",
            score: Infinity
        })).toThrow("Điểm số phải là số hợp lệ.");
    });

    it("tìm người chơi theo ID", () => {
        leaderboard.addPlayer(player1);

        expect(leaderboard.getPlayer("P01")).toEqual(player1);
    });

    it("trả về undefined nếu không tìm thấy người chơi", () => {
        expect(leaderboard.getPlayer("P99")).toBeUndefined();
    });

    it("cập nhật điểm người chơi", () => {
        leaderboard.addPlayer(player1);
        leaderboard.updateScore("P01", 300);

        expect(leaderboard.getPlayer("P01")?.score).toBe(300);
    });

    it("báo lỗi khi cập nhật người chơi không tồn tại", () => {
        expect(() => leaderboard.updateScore("P99", 100)).toThrow(
            "Không tìm thấy người chơi."
        );
    });

    it("không chấp nhận điểm cập nhật không hợp lệ", () => {
        leaderboard.addPlayer(player1);

        expect(() => leaderboard.updateScore("P01", NaN)).toThrow(
            "Điểm số phải là số hợp lệ."
        );
    });

    it("xếp hạng người chơi theo điểm giảm dần", () => {
        leaderboard.addPlayer(player1);
        leaderboard.addPlayer(player2);
        leaderboard.addPlayer(player3);

        expect(
            leaderboard.getAllPlayers().map(player => player.id)
        ).toEqual(["P02", "P03", "P01"]);
    });

    it("lấy Top 2 người chơi", () => {
        leaderboard.addPlayer(player1);
        leaderboard.addPlayer(player2);
        leaderboard.addPlayer(player3);

        expect(
            leaderboard.getTopPlayers(2).map(player => player.id)
        ).toEqual(["P02", "P03"]);
    });

    it("xếp hạng đúng sau khi cập nhật điểm", () => {
        leaderboard.addPlayer(player1);
        leaderboard.addPlayer(player2);

        leaderboard.updateScore("P01", 250);

        expect(
            leaderboard.getAllPlayers().map(player => player.id)
        ).toEqual(["P01", "P02"]);
    });

    it("xử lý khi có hai người chơi bằng điểm", () => {
        leaderboard.addPlayer({
            id: "P02",
            name: "Binh",
            score: 100
        });

        leaderboard.addPlayer({
            id: "P01",
            name: "An",
            score: 100
        });

        expect(
            leaderboard.getAllPlayers().map(player => player.id)
        ).toEqual(["P01", "P02"]);
    });

    it("trả về mảng rỗng khi chưa có người chơi", () => {
        expect(leaderboard.getAllPlayers()).toEqual([]);
    });

    it("trả về mảng rỗng khi lấy Top 0", () => {
        leaderboard.addPlayer(player1);

        expect(leaderboard.getTopPlayers(0)).toEqual([]);
    });

    it("báo lỗi khi K âm", () => {
        expect(() => leaderboard.getTopPlayers(-1)).toThrow(
            "K phải là số nguyên không âm."
        );
    });

    it("báo lỗi khi K không phải số nguyên", () => {
        expect(() => leaderboard.getTopPlayers(1.5)).toThrow(
            "K phải là số nguyên không âm."
        );
    });

    it("trả về tất cả người chơi khi K lớn hơn số lượng", () => {
        leaderboard.addPlayer(player1);

        expect(leaderboard.getTopPlayers(10)).toHaveLength(1);
    });
});