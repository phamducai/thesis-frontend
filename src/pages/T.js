import React from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
} from "@mui/material";
const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;
const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #ffffff;
  }
`;

const Test = () => {
  return (
    <StyledTable>
      <TableHead>
        <THead>
          <TableCell>Room Name</TableCell>
          <TableCell>Volt</TableCell>
          <TableCell>Ampe</TableCell>
          <TableCell>Power</TableCell>
          <TableCell>TotalDevice</TableCell>
        </THead>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Room1</TableCell>
          <TableCell>220</TableCell>
          <TableCell>10</TableCell>
          <TableCell>100Kw</TableCell>
          <TableCell>20</TableCell>
        </TableRow>
      </TableBody>
      <TableHead>
        <THead>
          <TableCell>Divice Name</TableCell>
          <TableCell>Relay_State</TableCell>
          <TableCell>Volt</TableCell>
          <TableCell>Ampe</TableCell>
          <TableCell>Power</TableCell>
          <TableCell>Engnergy</TableCell>
          <TableCell>Action</TableCell>
        </THead>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Tủ lạnh</TableCell>
          <TableCell>
            <Button> ON</Button>
          </TableCell>
          <TableCell>220</TableCell>
          <TableCell>10</TableCell>
          <TableCell>200</TableCell>
          <TableCell>100</TableCell>
          <TableCell>
            <Button> View</Button>
            <Button> Edit</Button>
            <Button> Delete</Button>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableHead>
        <THead>
          <TableCell>Temp</TableCell>
          <TableCell>Huminity</TableCell>
          <TableCell>Air_quarity</TableCell>

          <TableCell>Action</TableCell>
        </THead>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>30</TableCell>
          <TableCell>30</TableCell>
          <TableCell>50</TableCell>

          <TableCell>
            <Button> View</Button>
            <Button> Edit</Button>
            <Button> Delete</Button>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableHead>
        <THead>
          <TableCell>DeviceName</TableCell>
          <TableCell>Relay_state</TableCell>
          <TableCell>DeviceName</TableCell>
          <TableCell>Relay_state</TableCell>
          <TableCell>DeviceName</TableCell>
          <TableCell>Relay_state</TableCell>
          <TableCell>Action</TableCell>
        </THead>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>may bom</TableCell>
          <TableCell>
            <Button>OFF</Button>
          </TableCell>
          <TableCell>Quat</TableCell>
          <TableCell>
            <Button>OFF</Button>
          </TableCell>
          <TableCell>may say</TableCell>
          <TableCell>
            <Button>OFF</Button>
          </TableCell>

          <TableCell>
            {" "}
            <Button> View</Button>
            <Button> Edit</Button>
            <Button> Delete</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </StyledTable>
  );
};
export default Test;
