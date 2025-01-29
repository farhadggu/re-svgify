# 🚀 re-svg – Convert & Customize SVGs as React Components

**re-svg** is a powerful tool that transforms your SVG files into optimized, fully customizable React components. No more manual conversions—just drop your SVGs in a folder and let **re-svg** handle the rest!

---

## 🎨 **Fully Customizable Icons**

✔️ **Change Colors** – Modify `fill` and `stroke` dynamically using props.  
✔️ **Adjust Size** – Set custom `width` and `height` for your icons.  
✔️ **All SVG Props Supported** – Easily pass any SVG attribute like `opacity`, `strokeWidth`, `className`, etc.

### 🛠 Example: Dynamic Color & Size

```tsx
<IconArrowDown fill="red" stroke="blue" width={48} height={48} />
```

---

## ✨ Features

- 📦 **Automatic Conversion** – Turns `.svg` files into React components (`.tsx`).
- 🎨 **Customizable via Props** – Modify icon colors, sizes, and styles dynamically.
- 🚀 **Optimized Output** – Minifies, cleans, and simplifies SVGs for better performance.
- 🏗 **CamelCase Naming** – Converts file names like `icon-arrow-down.svg` to `IconArrowDown.tsx`.
- 🔧 **Flexible Configuration** – Customize input/output directories.

---

## 📥 Installation

```sh
npm install -g re-svg
```

---

## ⚡ Usage

1. **Place your SVG files** inside the `_icons/` folder in your project root.
2. **Run the CLI command:**

   ```sh
   npx re-svg
   ```

3. **Find your generated components** inside `components/icons/`.

---

## 🛠 Example

#### 🎨 Input (`_icons/arrow-down.svg`)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 19l-7-7h14z"/>
</svg>
```

#### 🚀 Output (`components/icons/IconArrowDown.tsx`)

```tsx
import BaseIcon from "../base-icon";
import { SvgIcon } from "../icon.types";

export default function IconArrowDown(props: SvgIcon) {
  return (
    <BaseIcon {...props}>
      <path d="M12 19l-7-7h14z" />
    </BaseIcon>
  );
}
```

### 🖌 Usage with Custom Styles

```tsx
<IconArrowDown fill="green" stroke="black" strokeWidth={2} width={32} height={32} />
```

---

## ⚙️ Configuration

By default, re-svg looks for `_icons/` and outputs components to `components/icons/`. You can modify this in `gulpfile.cjs`.

To customize the output directory:

```sh
npx re-svg --iconsFolder ./my-icons --componentsFolder ./src/components/icons
```

---

## 💡 Why Use re-svg?

✅ **Saves time** – No more manual React conversions!  
✅ **Performance-focused** – Minified, clean SVGs for better rendering.  
✅ **Fully customizable** – Change colors, sizes, and styles dynamically.  
✅ **Zero setup** – Just run and generate!

---

## 👩‍💻 Contributing

Found a bug? Have a feature request? Open an issue or contribute via PR!

---

## 📜 License

MIT License. Free to use, modify, and share.

---

🚀 **Transform & customize your icons effortlessly with re-svg!** 🎨💡
