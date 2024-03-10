import { Query } from "../pool";

const all = () => Query("SELECT * FROM produtos");

export default {
    all
}