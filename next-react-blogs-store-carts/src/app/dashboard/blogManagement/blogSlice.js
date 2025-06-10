import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

// 1. Get all blogs for a user
export const fetchBlogs = createAsyncThunk(
    "blog/fetchBlogs",
    async({ user_id }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .eq("user_id", user_id)
                .order("date", { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// 2. Add a new blog
export const addBlog = createAsyncThunk(
    "blog/addBlog",
    async(blogData, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from("blogs")
                .insert([blogData])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// 3. Update a blog
export const updateBlog = createAsyncThunk(
    "blog/updateBlog",
    async({ id, updatedData }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from("blogs")
                .update(updatedData)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// 4. Delete a blog
export const deleteBlog = createAsyncThunk(
    "blog/deleteBlog",
    async(id, { rejectWithValue }) => {
        try {
            const { error } = await supabase
                .from("blogs")
                .delete()
                .eq("id", id);

            if (error) throw error;
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const blogSlice = createSlice({
    name: "blog",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetchBlogs
            .addCase(fetchBlogs.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

        // addBlog
        .addCase(addBlog.fulfilled, (state, action) => {
            state.items.unshift(action.payload);
        })

        // updateBlog
        .addCase(updateBlog.fulfilled, (state, action) => {
            const index = state.items.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        })

        // deleteBlog
        .addCase(deleteBlog.fulfilled, (state, action) => {
            state.items = state.items.filter(b => b.id !== action.payload);
        });
    },
});

export default blogSlice.reducer;
export { fetchBlogs, addBlog, updateBlog, deleteBlog };